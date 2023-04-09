const express = require('express');
const app = express();
const port = 3000;

const bcrypt = require('bcrypt');

let dbUsers = [
    {
        username: "Wee",
        password: "0000",
        name : "wee",
        email : "ok@gmail.com"
    },

    {
        username: "A",
        password: "B",
        name : "C",
        email : "D@gmail.com"
    }
]

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.post('/',(req,res) => {
    res.send(req.body)
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.post('/register',async (req, res) => {

    const {username, password, name, email} = req.body
    const hash = await bcrypt.hash(password, 10)
    const regmatch = dbUsers.find(element => element.username === username)
        if (!regmatch) {
            dbUsers.push({
            username,
            password:hash,
            name,
            email
            })
            res.send("Registration success")
            return
        } else {
            res.send("Username is used")
        };
})

app.post('/login',async(req,res) => {
    const {username, password} = req.body
    const matched = dbUsers.find(element => element.username === username)
    if (!matched) {
        res.send("User not found")
        return
    }
    const hashmatch = await bcrypt.compare(password, matched.password)
    if (!hashmatch) {
        res.send("Password not matched")
        return
    } else {
    res.send(matched)
    }
});