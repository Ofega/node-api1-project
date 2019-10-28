const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(process.env.PORT || 3000, () => {
    console.log('server listening on port ' + (process.env.PORT || 3000))
})
