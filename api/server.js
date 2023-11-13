const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
connectDB();

//Middleware
app.use(express.json());


//Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.status(422).send({ error: 'You must provide name and password' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "Registration success" });
});


//Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username });
        if (!findUser) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        if (findUser.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        res.status(200).json({ message: 'Login Successful' });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})