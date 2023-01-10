import express from 'express'
import { CategoryModel } from '../db.js'

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => res.send(await CategoryModel.find()))

// Get one category
router.get('/:id', async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id)
        if (category) {
            res.send(category)
        } else {
            res.status(404).send({error: 'Category not found'})
        }
    }   
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

// Update a category
router.put('/:id', async (req, res) => {
    const { name } = req.body
    const newCategory = { name }

    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, newCategory, { returnDocument: 'after' })
        if (category) {
            res.send(category)
        } else {
            res.status(404).send({error: 'Category not found'})
        }
    }   
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id)
        if (category) {
            res.sendStatus(204)
        } else {
            res.status(404).send({error: 'Category not found'})
        }
    }   
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

// Create a new category
router.post('/', async (req, res) => {
    try {
        // 1. Create a new entry object with values passed in from the request
        const { name } = req.body
        // Validation and sanitization comes from Model
        const newCategory = { name }
        // 2. Push new entry to the entries array
        // entries.push(newEntry)
        const insertedCategory = await CategoryModel.create(newCategory)
        // 3. Send the new entry with 201 status code
        res.status(201).send(insertedCategory)
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

export default router
