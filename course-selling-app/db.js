const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})

const AdminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: ObjectId, ref: 'admin' }
})

const UserCourseMappingSchema = new Schema({
    courseId: { type: ObjectId, ref: 'course' },
    userId: { type: ObjectId, ref: 'user' }
})


const UserModel = mongoose.model("user", UserSchema);
const AdminModel = mongoose.model("admin", AdminSchema);
const CourseModel = mongoose.model("course", CourseSchema);
const UserCourseMappingModel = mongoose.model("UserCourseMap", UserCourseMappingSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    UserCourseMappingModel
}