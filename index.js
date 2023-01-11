import express from 'express'
import entryRoutes from './routes/entry.js'
import categoryRoutes from './routes/category.js'
import cors from 'cors'

const app = express()
const port = 4001

app.use(cors())

app.use(express.json())

// HOME ROUTE
app.get('/', (request, response) => response.send({ info: 'Journal API' }))

app.use('/entries', entryRoutes)

app.use('/categories', categoryRoutes)

app.listen(port, () => console.log(`App running at http://localhost:${port}`))
