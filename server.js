const express = require('express');

const db = require('./data/accounts-model')

const server = express();

server.use(express.json())

server.get('/', async(req, res) => {
    try {
        const budgets = await db.find()
        res.status(200).json(budgets)
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving budget data'
        })
    }
})

server.post('/', async (req, res) => {
    try {
        const newBudget = await db.add(req.body)
        res.status(201).json(newBudget)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding new budget'
        })
    }
})

module.exports = server;