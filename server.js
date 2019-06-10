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

server.get('/:id', async(req, res) => {
    try {
        const budget = await db.findById(req.params.id)
        if(budget) {
            res.status(200).json(budget)
        } else {
            res.status(404).json({
                message: "Budget with the specified ID does not exist"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving budget with specified ID"
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

server.delete('/:id', async(req, res) => {
    try {
        const budget = await db.remove(req.params.id)
        if(budget) {
            res.status(204).json({
                message: 'Budget has been deleted'
            })
        } else {
            res.status(404).json({
                message: 'Budget with the specified ID does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting budget'
        })
    }
})

server.put('/:id', async(req, res) => {
    try {
        const budget = await db.update(req.params.id, req.body)
        if(budget) {
            res.status(200).json(budget)
        } else {
            res.status(400),json({
                message: 'Please provide name and budget'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating budget'
        })
    }
})

module.exports = server;