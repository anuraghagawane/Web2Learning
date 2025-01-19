const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const SECRET = "ANURAG";

app.use(express.json());

const users = [];

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user || user.password !== password) {
        res.json({
            message: "Incorrect credentials",
        })
    }

    const token = jwt.sign({ username }, SECRET);

    res.json({
        token
    });
})

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    if (users.find(u => u.username === username)) {
        res.json({
            message: "username already exists"
        })
        res.end();
        return;
    }

    users.push({
        username,
        password
    });

    res.json({
        message: "You have successfully signed in",
    })
})

function auth(req, res, next) {
    const token = req.body.token;

    const decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken.username) {
        res.json({
            message: "you are not logged in"
        })
    }

    req.username = decodedToken.username;

    next();
}

app.get("/me", auth, (req, res) => {
    const user = users.find(u => u.username === req.username);
    if (!user) res.json({
        message: "user not found",
    })
    res.json(user);
})

app.listen("3000", () => {
    console.log("server running on 3000");

})