const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { userRouter } = require("./routes/userRouter.js");
const { courseRouter } = require("./routes/courseRouter.js");
const { adminRouter } = require("./routes/adminRouter.js");
const { } = require("./db.js");
const { MONGODB_URL } = require("./config.js");

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to db");
    app.listen(3000, () => console.log("Listening on 3000"));
}

main();