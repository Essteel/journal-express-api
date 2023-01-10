import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry.js'

const app = express()
const port = 4001

app.use(express.json())

// HOME ROUTE
app.get('/', (request, response) => response.send({ info: 'Journal API' }))

app.use('/entries', entryRoutes)

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

app.listen(port, () => console.log(`App running at http://localhost:${port}`))
