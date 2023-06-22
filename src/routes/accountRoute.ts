import express, { Router } from 'express';
import accountController from '../controllers/accountController';
import authenticate from '../middlewares/authentication';
import validateRequestBody from '../middlewares/validateRequestBody';
import rateLimiter from '../middlewares/rateLimiter';

const router: Router = express.Router();
const AccountController = new accountController();



// Create a new account
router.post('/create', rateLimiter, validateRequestBody, AccountController.createAccount);

// Login account
router.post('/login', rateLimiter, AccountController.login);

// Authenticate account
router.get('/', rateLimiter,  authenticate, AccountController.getAuthAccount);

// Get all accounts
router.get('/all', rateLimiter, AccountController.getAllAccounts);

// Get an account by ID
router.get('/:accountId', rateLimiter, AccountController.getAccountById);

// Get all admin
router.get('/all/admin', rateLimiter, AccountController.getAllAdmin);

// Get all None Admin
router.get('/none/admin', rateLimiter, AccountController.getAllNoneAdmin);

// Update a account
router.put('/', rateLimiter, authenticate, AccountController.updateAccount);

// Remove a account
router.delete('/remove', rateLimiter, authenticate, AccountController.removeAccount);

export default router;
