const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { userRouter } = require("./routes/userRouter.js");
const { courseRouter } = require("./routes/courseRouter.js");
const { } = require("./db.js");

const app = express();


app.use("/user", userRouter);
app.use("/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to db");
    app.listen(3000, () => console.log("Listening on 3000"));
}

main();