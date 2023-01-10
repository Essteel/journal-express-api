import { EntryModel, CategoryModel, dbClose } from './db.js'

await EntryModel.deleteMany()
console.log('All entries deleted')
await CategoryModel.deleteMany()
console.log('All categories deleted')

const categories = [
    { name: 'Food' }, 
    { name: 'Coding' }, 
    { name: 'Work' }, 
    { name: 'Other' }
]

const cats = await CategoryModel.insertMany(categories)
console.log("Categories seeded successfully")

const entries = [
    {category: cats[0], content: 'Hello!'},
    {category: cats[1], content: 'Express is cool!'},
    {category: cats[2], content: 'Another day at the office.'}
]

await EntryModel.insertMany(entries)
console.log('Entries seeded successfully')

dbClose()
