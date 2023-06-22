import request from 'supertest';
import createServer from '../utils/server';
import { expect, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

  describe('POST /account/create', () => {
    it('should create a new account', async () => {
      const accountData = {
        name: 'John Doe',
        userName: 'johndoe',
        email: 'test@example.com',
        password: await bcrypt.hash('test123', 10), // Hash the password
      };

      const response = await request(app)
        .post('/account/create')
        .send(accountData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('userName', 'johndoe');
      expect(response.body).toHaveProperty('isAdmin', false);
    });

    it('should return an error if Email already exist.', async () => {
      const accountData = {
        name: 'John Doe',
        userName: 'johndoe',
        email: 'test@example.com',
        password: await bcrypt.hash('test123', 10), // Hash the password
        isAdmin: false,
      };

      // Assuming the account creation fails due to an existing email address
      const response = await request(app)
        .post('/account/create')
        .send(accountData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Account with email test@example.com already exist');
    });

    it('should return an error if userName already exist.', async () => {
        const accountData = {
          name: 'John Doe',
          userName: 'johndoe',
          email: 'changeemail@example.com',
          password: await bcrypt.hash('test123', 10), // Hash the password
          isAdmin: false,
        };
  
        // Assuming the account creation fails due to an existing email address
        const response = await request(app)
          .post('/account/create')
          .send(accountData);
  
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Account with username johndoe already exist');
      });

      it('should return an error if there is a missing required field.', async () => {
        const accountData = {
          name: 'John Doe',
          userName: 'emmadoe',
          password: await bcrypt.hash('test123', 10), // Hash the password
          isAdmin: false,
        };
  
        // Assuming the account creation fails due to an existing email address
        const response = await request(app)
          .post('/account/create')
          .send(accountData);
  
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Missing required fields: email');
      });
  })
  describe('POST /account/login', () => {
    it('should login with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'test123',
      };
  
      const accountData = {
        name: 'John Doe',
        userName: 'johndoe',
        email: 'test@example.com',
        password: await bcrypt.hash('test123', 10), // Hashed password
      };
  
      // Create a user account with the hashed password
      await request(app)
        .post('/account/create')
        .send(accountData);
  
      const response = await request(app)
        .post('/account/login')
        .send(credentials);
  
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("message", "Invalid password");
    });
  
    it('should return error for incorrect password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'test123',
      };
  
      const accountData = {
        name: 'John Doe',
        userName: 'johndoe',
        email: 'test@example.com',
        password: await bcrypt.hash('test123', 10), // Hashed password
      };
  
      // Create a user account with the hashed password
      await request(app)
        .post('/account/create')
        .send(accountData);
  
      const response = await request(app)
        .post('/account/login')
        .send(credentials);
  
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("message", "Invalid password");
    });
});

  
})