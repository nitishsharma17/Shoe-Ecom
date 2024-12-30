const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const app = express();
const port = 3002;

app.use(cors({
    origin: 'http://127.0.0.1:5500'  
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Home Page...");
});

app.get("/about", (req, res) => {
    res.send("About Page....");
});

const users = [];

app.post('/registered_user', (req, res) => {
    let user_id;
    if (users.length === 0) {
        user_id = 1;
    } else {
        user_id = users[users.length - 1].id + 1;
    }
    const new_user = {
        id: user_id,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };
    users.push(new_user);

    fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        console.log("User data written to file");
    });

    console.log(users);
    res.status(201).json({ message: "User Registered..." });
});

app.listen(port, () => {
    console.log("Server Running....");
});