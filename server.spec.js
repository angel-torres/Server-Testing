require('dotenv').config();
const request = require('supertest');

const server = require('./server.js');

describe('tests', () => {
    it('process.env.PORT should be assigned to 4000', () => {
        expect(process.env.PORT).toBe("4000");
    });

    it('process.eng.DB_ENV should equal testing', () => {
        expect(process.env.DB_ENV).toBe("testing")
    })

    describe('/get', () => {
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
});