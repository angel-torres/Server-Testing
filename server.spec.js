require('dotenv').config();
const request = require('supertest');
const db = require('./data/dbConfig.js');

const server = require('./server.js');

describe('tests', () => {

    afterEach(async () => {
        await db('students').truncate();
    })

    it('process.env.PORT should be assigned to 4000', () => {
        expect(process.env.PORT).toBe("4000");
    });

    it('process.env.DB_ENV should equal testing', () => {
        expect(process.env.DB_ENV).toBe("testing")
    })

    describe('get', () => {
        it('should return status 200 OK', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json')
        })

        it('should return []', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual([])
        });
    });

    describe('post', () => {
        it('should post student to db', async () => {
            const [id] = await db('students').insert({name:'gaby'}, 'id');
            const student = await db('students').where({id}).first()
            expect(student.name).toBe("gaby")
        });

        it('should post student using post endpoint', async () => {
            const student = await request(server).post('/').send({name:"gaby"});
            expect(student.status).toBe(200);
        })

        it('should delete student', async () => {
            const student = await db('students').insert({name:"edwin"})
            const students = await db('students')
            // const id = await db('students').where({id:studentId});
            expect(students).toEqual([{"id": 1, "name": "edwin"}])
        })
    });
});