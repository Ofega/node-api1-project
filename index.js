const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors());


server.get('/api/users', getAllUsers);
server.get('/api/users/:id', getUserById);
server.post('/api/users', createNewUser);
server.put('/api/users/:id', updateUserById);
server.delete('/api/users/:id', deleteUserById);


function getAllUsers(req, res) {
    db.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res
            .status(500)
            .json({error: "The users information could not be retrieved." });
        })
}

function getUserById(req, res) {
    const { id } = req.params;

    db.findById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
            res
                .status(404)
                .json({ error: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res
            .status(500)
            .json({error: "The user information could not be retrieved." });
        })
}

function createNewUser(req, res) {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res
        .status(400)
        .json({ error: 'Please provide name and bio for the user.' });
    } else {
        db.insert(req.body)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(() => {
                res
                .status(500)
                .json({error: 'There was an error while saving the user to the database'});
            });
    }
}

function updateUserById(req, res) {
    const { id } = req.params;
    const { name, bio } = req.body;

    if (!name || !bio) {
        res
        .status(400)
        .json({ error: 'Please provide name and bio for the user.' });
    } else {
        db.update(id, req.body)
            .then(data => {
                if(data) {
                    db.findById(id)
                        .then(data => {
                            res.status(200).json(data);
                        })
                } else {
                    res
                    .status(404)
                    .json({ error: 'The user with the specified ID does not exist.'});
                }
            })
            .catch(() => {
                res
                .status(500)
                .json({error: 'The user information could not be modified.'});
            });
    }
}

function deleteUserById(req, res) {
    const { id } = req.params;

    db.findById(id)
        .then(user => {
            db.remove(id)
                .then(data => {
                    res.status(200).json(user);
                })
                .catch(error => {
                    res
                    .status(500)
                    .json({error: "The user could not be removed" });
                })
        })
        .catch(err => {
            res
            .status(404)
            .json({ error: 'The user with the specified ID does not exist.' });
        })  
}

server.listen(process.env.PORT || 5000, () => {
    console.log('server listening on port ' + (process.env.PORT || 5000))
})
