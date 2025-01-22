const { Router } = require("express");
const { CourseModel, UserCourseMappingModel } = require("../db");
const { userAuthMiddleware } = require("../midldleware/userMiddleware");

const courseRouter = Router();

courseRouter.get("/preview", async (req, res) => {
    try {
        const courses = await CourseModel.find({}).populate("creatorId", ["firstName", "lastName", "email"]);

        res.status(200).json({
            courses: courses
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "unable to process the request"
        })
    }
})

courseRouter.post("/purchase", userAuthMiddleware, async (req, res) => {
    const userId = req.id;
    const courseId = req.body.courseId;

    try {
        await UserCourseMappingModel.create({
            userId,
            courseId
        })

        res.status(200).json({
            message: "Purchase successful"
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "something went wrong"
        })
    }
})

module.exports = {
    courseRouter,
}