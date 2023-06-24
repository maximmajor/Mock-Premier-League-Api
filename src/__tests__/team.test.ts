import request from 'supertest';
import createServer from '../utils/server';
import { expect, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const app = createServer();

describe('Team Controller', () => {
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

    describe('POST /team/create', () => {
        it('should create a team with an authenticated user', async () => {
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

            const teamData = {

                teamName: "Arsenal",
                teamMembers: [
                    { name: "Matteo Guendouzi", "role": "Midfielder" },
                    { name: "Granit Xhaka", "role": "Midfielder" }
                ]
            };

            const response = await request(app)
                .post('/team/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send(teamData);
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

            const teamData = {

                teamName: "Arsenal",
                teamMembers: [
                    { name: "Matteo Guendouzi", "role": "Midfielder" },
                    { name: "Granit Xhaka", "role": "Midfielder" }
                ]
            };

            const response = await request(app)
                .post('/team/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send(teamData);
            expect(response.status).toBe(401);
            expect(response.body).toEqual(response.body);
        });
    })

    describe('GET /team', () => {
        it('should get all team ', async () => {
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
                .get('/team')
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(response.body);
        });
        it('should get all team ', async () => {
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
                .get('/team')
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.status).toBe(200);
            expect(response.body).toEqual(response.body);
        });


    })

})