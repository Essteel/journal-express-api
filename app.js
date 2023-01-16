import express from 'express'
import entryRoutes from './routes/entry.js'
import categoryRoutes from './routes/category.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

// HOME ROUTE
app.get('/', (request, response) => response.send({ info: 'Journal API' }))

app.use('/entries', entryRoutes)

app.use('/categories', categoryRoutes)

export default app
