import request from 'supertest';
import createServer from '../utils/server';
import { expect, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = createServer();

describe('Fixture Controller', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for connections to close
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('POST /fixture/create', () => {
        it('should create a fixture with an authenticated user and user must be Admin', async () => {
            const accountData = {
                name: 'John Doe',
                userName: 'johndoe',
                email: 'test@example.com',
                isAdmin: true,
                password: 'test123',
            };

            // Create a user account with the hashed password
            await request(app).post('/account/create').send(accountData);

            const loginCredentials = {
                email: 'test@example.com',
                password: 'test123',
            };

            const loginResponse = await request(app)
                .post('/account/login')
                .send(loginCredentials);

            const authToken = loginResponse.body.token;

            const fixtureData = {
                team1: "649372921f63360e5b36de90",
                team2: "64936f0ea62de83d4653c93c",
                date: "23/4/2023 10:10:00"
            }

            const response = await request(app)
                .post('/fixture/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send(fixtureData);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(response.body);
        });

        it('should return an error if not an admin', async () => {
            const accountData = {
                name: 'John Doe',
                userName: 'johndoe3',
                email: 'test3@example.com',
                password: 'test123',
            };

            // Create a user account with the hashed password
            await request(app).post('/account/create').send(accountData);

            const loginCredentials = {
                email: 'test3@example.com',
                password: 'test123',
            };

            const loginResponse = await request(app)
                .post('/account/login')
                .send(loginCredentials);

            const authToken = loginResponse.body.token;

            const fixtureData = {
                team1: "649372921f63360e5b36de90",
                team2: "64936f0ea62de83d4653c93c",
                date: "23/4/2023 10:10:00"
            }

            const response = await request(app)
                .post('/fixture/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send(fixtureData);
            expect(response.status).toBe(401);
            expect(response.body).toEqual(response.body);
        });
    })

    describe('GET /fixture', () => {
        it('should get all fixture ', async () => {
            const accountData = {
                name: 'John Doe',
                userName: 'johndoe0',
                email: 'test0@example.com',
                isAdmin: true,
                password: 'test123',
            };

            // Create a user account with the hashed password
            await request(app).post('/account/create').send(accountData);

            const loginCredentials = {
                email: 'test0@example.com',
                password: 'test123',
            };

            const loginResponse = await request(app)
                .post('/account/login')
                .send(loginCredentials);

            const authToken = loginResponse.body.token;

            const response = await request(app)
                .get('/fixture')
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(response.body);
        });
        it('should get all fixture ', async () => {
            const accountData = {
                name: 'John Doe',
                userName: 'johndoe0',
                email: 'test0@example.com',
                isAdmin: true,
                password: 'test123',
            };

            // Create a user account with the hashed password
            await request(app).post('/account/create').send(accountData);

            const loginCredentials = {
                email: 'test0@example.com',
                password: 'test123',
            };

            const loginResponse = await request(app)
                .post('/account/login')
                .send(loginCredentials);

            const authToken = loginResponse.body.token;

            const response = await request(app)
                .get('/fixture')
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(response.body);
        });


    })

})