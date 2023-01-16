import app from './app.js'
import request from 'supertest'

describe('App tests', () => {
    test('Get home page', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })

    describe('Get categories list', () => {
        let res

        beforeEach(async () => {
            res = await request(app).get('/categories')
            expect(res.statusCode).toBe(200)
            expect(res.headers['content-type']).toMatch(/json/i)
        })

        it('Should be an array of 4 elements', () => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body.length).toBe(4)
        })

        it('Has an element with the correct data structure and expected data', () => {
            res.body.forEach(el => {
                expect(el._id).toBeDefined()
                expect(el.name).toBeDefined()
                expect(el._id.length).toBe(24)
            })
            expect(res.body[0].name).toBe('Coding')
        })
    })

    test('Create a new entry', async () => {
        const res = await request(app).post('/entries').send({
            category: 'Work',
            content: 'Jest testing'
        })

        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.content).toBeDefined()
        expect(res.body.category.name).toBeDefined()
        expect(res.body.category.name).toBe('Work')
        expect(res.body.content).toBe('Jest testing')
    })
})