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
});

server.post('/', async (req, res) => {
    try {
        let student = req.body
        const [id] = await db('students').insert(student, 'id');
        student = await db('students').where({id}).first()

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({message: "something went wrong"});
    }
});

server.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const removed = await db('students').where({id}).del()
        res.status(204);
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
})


module.exports = server