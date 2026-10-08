const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// JSON data files
const usersFile = path.join(__dirname, "users.json");
const questionsFile = path.join(__dirname, "questions.json");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// REGISTER PAGE
// ===============================

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// ===============================
// REGISTER USER
// ===============================

app.post("/register", (req, res) => {

    const {
        name,
        age,
        dob,
        gender,
        email,
        mobile,
        username,
        password
    } = req.body;

    // Check required fields
    if (
        !name ||
        !age ||
        !dob ||
        !gender ||
        !email ||
        !mobile ||
        !username ||
        !password
    ) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        });
    }

    // Read existing users
    let users = [];

    try {
        users = JSON.parse(
            fs.readFileSync(usersFile, "utf8")
        );
    } catch (error) {
        users = [];
    }

    // Check duplicate username
    const existingUsername = users.find(
        user => user.username === username
    );

    if (existingUsername) {
        return res.json({
            success: false,
            message: "Username already exists."
        });
    }

    // Check duplicate email
    const existingEmail = users.find(
        user => user.email === email
    );

    if (existingEmail) {
        return res.json({
            success: false,
            message: "Email already registered."
        });
    }

    // Create new user
    const newUser = {
        name,
        age,
        dob,
        gender,
        email,
        mobile,
        username,
        password
    };

    // Add new user without deleting old users
    users.push(newUser);

    // Save users
    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 4)
    );

    res.json({
        success: true,
        message: "Registration successful!"
    });
});

// ===============================
// LOGIN PAGE
// ===============================

app.post("/login", (req, res) => {

    const {
        username,
        password
    } = req.body;


    let users = [];

    try {

        users = JSON.parse(
            fs.readFileSync(
                usersFile,
                "utf8"
            )
        );

    } catch (error) {

        return res.json({

            success: false,

            message:
                "Unable to read user database."

        });

    }


    const user = users.find(

        user =>

            (
                user.username === username ||
                user.email === username
            )

            &&

            user.password === password

    );


    if (!user) {

        return res.json({

            success: false,

            message:
                "Invalid username/email or password."

        });

    }


    console.log(
        "User logged in:",
        user.username
    );


    res.json({

        success: true,

        message:
            "Login successful!",

        user: {

            name: user.name,

            username: user.username,

            email: user.email

        }

    });

});
// ===============================
// DASHBOARD
// ===============================

app.get("/dashboard", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "dashboard.html")
    );
});

// ===============================
// GET QUIZ QUESTIONS
// ===============================

app.get("/api/questions", (req, res) => {

    try {

        const questions = JSON.parse(
            fs.readFileSync(questionsFile, "utf8")
        );

        res.json(questions);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to load questions."
        });

    }
});

// ===============================
// SUBMIT QUIZ
// ===============================

app.post("/submit-quiz", (req, res) => {

    try {

        const questions = JSON.parse(
            fs.readFileSync(questionsFile, "utf8")
        );

        const userAnswers = req.body.answers || [];

        let score = 0;

        const results = questions.map(
            (question, index) => {

                const userAnswer =
                    userAnswers[index] || "";

                const correctAnswer =
                    question.answer;

                const isCorrect =
                    userAnswer === correctAnswer;

                if (isCorrect) {
                    score++;
                }

                return {
                    question: question.question,
                    userAnswer:
                        userAnswer || "Not answered",
                    correctAnswer,
                    isCorrect
                };
            }
        );

        console.log("Quiz submitted.");
        console.log("Score:", score);

        res.json({
            success: true,
            score,
            total: questions.length,
            results
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to calculate score."
        });

    }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});