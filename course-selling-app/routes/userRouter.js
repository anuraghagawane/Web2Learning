const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config");
const { UserModel, UserCourseMappingModel } = require("../db");
const { userAuthMiddleware } = require("../midldleware/userMiddleware");
const { populate } = require("dotenv");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
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
        await UserModel.create({
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

userRouter.post("/signin", async (req, res) => {
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
    const user = await UserModel.findOne({
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
    }, JWT_USER_SECRET);

    res.cookie("token", token, {
        maxAge: 86400,
    });
    res.status(200).json({
        token,
    });
})

userRouter.get("/purchases", userAuthMiddleware, async (req, res) => {
    try {
        const courses = await UserCourseMappingModel.find({
            userId: req.id
        }).populate({ path: "courseId", populate: { path: "creatorId", select: ["email", "firstName", "lastName"] } })

        res.status(200).json({
            courses: courses
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "something went wrong"
        })
        return;
    }
})

module.exports = {
    userRouter,
}