const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");

app.use(express.static(path.join(__dirname, 'public'))); // Serve files from 'public' folder

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/details", express.static(path.join(__dirname, "public", "details")));

app.get("/details", (req, res) => {
    const dirPath = path.join(__dirname, "public", "details");

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            res.status(500).send("Error reading directory");
            return;
        }
        let fileLinks = files.map(file => `<a href="/details/${file}">${file}</a>`).join("<br>");
        res.send(`${fileLinks}`);
    });
});

app.use("/songs", express.static(path.join(__dirname, "public", "songs")));

app.get("/songs", (req, res) => {
    const dirPath = path.join(__dirname, "public", "songs");

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            res.status(500).send("Error reading directory");
            return;
        }
        let fileLinks = files.map(file => `<a href="/songs/${file}">${file}</a>`).join("<br>");
        res.send(`${fileLinks}`);
    });
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
// ✅ Serve the login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {  
        return res.json({ success: true, message: "Login successful" }); // ✅ Use return
    } else {
        return res.json({ success: false, message: "Invalid credentials" }); // ✅ Use return
    }
});



app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
