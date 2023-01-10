import express from 'express'
import { EntryModel, CategoryModel } from './db.js'

const app = express()
const port = 4001

app.use(express.json())

// HOME ROUTE
app.get('/', (request, response) => response.send({ info: 'Journal API' }))

// ### CATEGORY ROUTES ###

// Get all categories
app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

// Get one category
app.get('/categories/:id', async (req, res) => {
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
app.put('/categories/:id', async (req, res) => {
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
app.delete('/categories/:id', async (req, res) => {
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
app.post('/categories', async (req, res) => {
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

// ### ENTRY ROUTES ###

// Get all entries
app.get('/entries', async (req, res) => res.send(await EntryModel.find().populate({path: 'category', select: 'name'})))

// Get one entry
app.get('/entries/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findById(req.params.id).populate({ path: 'category', select: 'name '})
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({error: 'Entry not found'})
        }
    }   
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

// Update an entry
app.put('/entries/:id', async (req, res) => {
    const { category, content } = req.body
    const newEntry = { category, content }

    try {
        const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, { returnDocument: 'after' })
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({error: 'Entry not found'})
        }
    }   
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

// Delete an entry
app.delete('/entries/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findByIdAndDelete(req.params.id)
        if (entry) {
            res.sendStatus(204)
        } else {
            res.status(404).send({error: 'Entry not found'})
        }
    }   
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

// Add a new entry
app.post('/entries', async (req, res) => {
    try {
        // 1. Create a new entry object with values passed in from the request
        const { category, content } = req.body
        // Validation and sanitization comes from Model
        const newEntry = {category, content}
        // 2. Push new entry to the entries array
        // entries.push(newEntry)
        const insertedEntry = await EntryModel.create(newEntry)
        // 3. Send the new entry with 201 status code
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
})

app.listen(port, () => console.log(`App running at http://localhost:${port}`))
