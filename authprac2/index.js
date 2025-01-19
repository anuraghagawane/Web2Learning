const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod")
const { UserModel, TodoModel } = require("./db");

const JWT_SECRET = "ANURAG";

const app = express();
// gy67rG3LzYHOdbA3
mongoose.connect("mongodb+srv://admin-anurag:gy67rG3LzYHOdbA3@cluster0.2miw6.mongodb.net/todo-anurag")

app.use(express.json());

app.post("/signin", async (req, res) => {
    const signinSchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    const isSafe = signinSchema.safeParse(req.body);

    if (!isSafe.success) {
        res.json({
            messages: "incorrect format",
            error: isSafe.error
        })
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({
        email: email,
    });

    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password);
        if (correctPassword) {
            const token = jwt.sign({
                id: user._id
            }, JWT_SECRET)

            res.json({
                token: token
            })
        }
        else {
            res.json({
                message: "Incorrect credentials"
            })
        }
    } else {
        res.json({
            message: "User not found"
        })
    }

})

app.post("/signup", async (req, res) => {
    const signupSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string(),
    });

    const isSafe = signupSchema.safeParse(req.body);

    if (!isSafe.success) {
        res.json({
            messages: "incorrect format",
            error: isSafe.error
        })
    }

    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
        email,
        password: hashedPassword,
        username
    })

    res.json({
        message: "You are successfully signed up",
    })
})

function authMiddleWare(req, res, next) {
    const token = req.headers.token;

    const verifiedToken = jwt.verify(token, JWT_SECRET);

    req.id = verifiedToken.id;

    next();
}

app.post("/todo", authMiddleWare, async (req, res) => {
    const id = req.id;
    const title = req.body.title;

    await TodoModel.create({
        title: title,
        userId: id
    })

    res.json({
        message: "todo created",
    })
})

app.get("/todo", authMiddleWare, async (req, res) => {
    const id = req.id;
    const todos = await TodoModel.find({
        userId: id,
    })
    res.json({
        todo: todos
    })
})

app.listen(3000, () => console.log("listening on 3000"));