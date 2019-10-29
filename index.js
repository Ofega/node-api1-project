const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/users', getAllUsers);
server.get('/api/users/:id', getAUser);

function getAllUsers(req, res) {
    db.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error)
        })
}

function getAUser(req, res) {
    db.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error)
        })
}

server.listen(process.env.PORT || 3000, () => {
    console.log('server listening on port ' + (process.env.PORT || 3000))
})
