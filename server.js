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

function login(username, password) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);
    console.log("someone try to login with", username, hash)
    let matched = dbUsers.find(element => 
        element.username == username
    )
    if (matched) {
        if (matched.password == hash) {
            return matched
        } else {
            return "Password not matched" + hash;
        } 
    } else {
        return "User not found"
    }
}

function register(newusername, newpassword, newname, newemail) {

    let regmatch = dbUsers.find(element =>
        element.username == newusername
        )
        if (regmatch) {
            return "Username is used"
        } else {

        salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(newpassword, salt);

        dbUsers.push({
            username: newusername,
            password: hash,
            name: newname,
            email: newemail,
        })
        return hash;
    }
}

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

app.post('/register', (req, res) => {
    let data = req.body
    res.send(
        register(
        data.newusername,
        data.newpassword,
        data.newname,
        data.newemail
        )

    );
});

app.post('/login',(req,res) => {
    let data = req.body
    res.send(
        login(
            data.username,
            data.password
        )
    );
});

