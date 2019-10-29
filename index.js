const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors());

server.post('/api/users', createNewUser);
server.get('/api/users', getAllUsers);
server.get('/api/users/:id', getUserById);

function createNewUser(req, res) {
    const user = {
        "name": req.body.name,
    }

    db.insert(user)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.json(error)
        })
}

function getAllUsers(req, res) {
    db.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.json(error)
        })
}

function getUserById(req, res) {
    const { id } = req.params;
    db.findById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.json(error)
        })
}

server.listen(process.env.PORT || 5000, () => {
    console.log('server listening on port ' + (process.env.PORT || 5000))
})
