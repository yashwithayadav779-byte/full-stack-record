const express = require("express");
const fs = require("fs");
const os = require("os");
const dns = require("dns");

const app = express();
const PORT = 3000;

function getStudents() {
    const data = fs.readFileSync("students.json", "utf-8");
    return JSON.parse(data);
}

// Home route
app.get("/", (req, res) => {
    res.send("Student Course Management System");
});


app.get("/students", (req, res) => {
    const students = getStudents();
    res.json(students);
});


app.get("/students/:id", (req, res) => {
    const students = getStudents();

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).send("Student not found");
    }
});


app.get("/search", (req, res) => {
    const students = getStudents();

    const course = req.query.course;

    const result = students.filter(
        student => student.course.toLowerCase() === course.toLowerCase()
    );

    res.json(result);
});

app.get("/system", (req, res) => {
    res.json({
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        cpus: os.cpus().length,
        memory: os.totalmem()
    });
});


app.get("/dns", (req, res) => {
    dns.lookup("google.com", (err, address, family) => {

        if (err) {
            return res.status(500).send("DNS lookup failed");
        }

        res.json({
            hostname: "google.com",
            address: address,
            family: family
        });
    });
});




app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});