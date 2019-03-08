const express = require('express');
const db = require('./data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const students = await db('students');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({message: "something went wrong"})
    }

})

module.exports = server