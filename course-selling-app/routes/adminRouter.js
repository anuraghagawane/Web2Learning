const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminModel, CourseModel } = require("../db");
const { JWT_ADMIN_SECRET } = require("../config");
const { adminAuthMiddleware } = require("../midldleware/adminMiddleware");

const adminRouter = Router();

adminRouter.post("/signin", async (req, res) => {
    const signInSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const isSafe = signInSchema.safeParse(req.body);

    if (!isSafe.success) {
        res.json({
            message: isSafe.error
        })
    }

    const { email, password } = req.body;
    const user = await AdminModel.findOne({
        email: email,
    })

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        res.status(403).json({
            message: "Invalid credentials"
        })
        return;
    }
    const token = jwt.sign({
        id: user._id
    }, JWT_ADMIN_SECRET)

    res.cookie("token", token, {
        maxAge: 86400,
    });
    res.status(200).json({
        token,
    });
})

adminRouter.post("/signup", async (req, res) => {
    const signUpSchema = z.object({
        email: z.string().email().min(3).max(50),
        password: z.string().min(3).max(50),
        firstName: z.string(),
        lastName: z.string()
    })

    const isSafe = signUpSchema.safeParse(req.body);

    if (!isSafe.success) {
        res.status(403).json({
            message: isSafe.error
        })
        return;
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await AdminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
    } catch (e) {
        res.status(403).json({
            message: "Failed to signup"
        })
        console.log(e);

        return;
    }

    res.status(200).json({
        message: "You have signed up"
    })

})

adminRouter.post("/course", adminAuthMiddleware, async (req, res) => {
    const courseSchema = z.object({
        title: z.string().min(3).max(50),
        description: z.string().min(10).max(200),
        price: z.number(),
        imageUrl: z.string()
    })

    const isSafe = courseSchema.safeParse(req.body);

    if (!isSafe.success) {
        res.status(403).json({
            message: isSafe.error
        })
        return;
    }

    const creatorId = req.id;

    const { title, description, price, imageUrl } = req.body;

    try {
        await CourseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "failed to create course"
        })
        return;
    }

    res.status(200).json({
        message: "course created successfully"
    })
})

adminRouter.put("/course", adminAuthMiddleware, async (req, res) => {
    const creatorId = req.id;
    const courseId = req.body.courseId;

    try {
        const course = await CourseModel.findOne({
            creatorId: creatorId,
            _id: courseId
        })

        if (!course) {
            res.status(403).json({
                message: "This course does not belong to you",
            })
            return;
        }

        Object.entries(req.body).map((value) => {
            if (value[0] !== courseId) {
                course[value[0]] = value[1];
            }
        })

        await CourseModel.updateOne({
            creatorId: creatorId,
            _id: courseId
        }, {
            title: course.title,
            description: course.description,
            price: course.price,
            imageUrl: course.imageUrl
        })

    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "Unable to update the course"
        })
        return;
    }

    res.status(200).json({
        message: "Successfully updated the course"
    })
})

adminRouter.get("/course", adminAuthMiddleware, async (req, res) => {
    const creatorId = req.id;

    try {
        const courses = await CourseModel.find({
            creatorId: creatorId,
        }).populate("creatorId", ["firstName", "lastName"]);

        res.status(200).json({
            courses: courses
        })
    } catch (e) {
        console.log(e);
        res.json(403).json({
            message: "Failed to get courses"
        })
    }
})

module.exports = {
    adminRouter
}