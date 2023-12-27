const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const { checkBody } = require('./validation/validator')
const { userScheme } = require('./validation/scheme')

const app = express();
app.use(express.json());

const pathToUsersFile = path.join(__dirname, 'users.json');

app.get('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToUsersFile, 'utf-8'));

    res.send({ data });
});

app.get('/users/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToUsersFile, 'utf-8'));

    const user = data.find((user) => user.id === +req.params.id);
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});
app.post('/users', checkBody(userScheme), (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToUsersFile, 'utf-8'));
    let uniqueId = uniqid();

    data.push({
        id: uniqueId,
        ...req.body
    });

    res.send({ id: uniqueId });

    fs.writeFileSync(pathToUsersFile, JSON.stringify(data, null, 2));
});

app.put('/users/:id', checkBody(userScheme), (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToUsersFile, 'utf-8'));

    const user = data.find((user) => user.id === +req.params.id);
    if (user) {
        user.name = req.body.name;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
    fs.writeFileSync(pathToUsersFile, JSON.stringify(data, null, 2));
});

app.delete('/users/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToUsersFile, 'utf-8'));

    const user = data.find((user) => user.id === +req.params.id);
    if (user) {
        const userIndex = data.indexOf(user);
        data.splice(userIndex, 1);
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
    fs.writeFileSync(pathToUsersFile, JSON.stringify(data, null, 2));
});

app.listen(3000);
