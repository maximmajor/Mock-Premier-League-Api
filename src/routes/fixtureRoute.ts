import express, { Router } from 'express';
import accountController from '../controllers/accountController';
import authenticate from '../middlewares/authentication';
import validateRequestBody from '../middlewares/validateRequestBody';

const router: Router = express.Router();
const AccountController = new accountController();



// Create a new account
router.post('/create', validateRequestBody, AccountController.createAccount);

// Login account
router.post('/login', AccountController.login);

// Authenticate account
router.get('/', authenticate, AccountController.getAuthAccount);

// Get all accounts
router.get('/all', AccountController.getAllAccounts);

// Get an account by ID
router.get('/:accountId', AccountController.getAccountById);

// Get all admin
router.get('/all/admin', AccountController.getAllAdmin);

// Get all None Admin
router.get('/none/admin', AccountController.getAllNoneAdmin);

// Update a account
router.put('/', authenticate, AccountController.updateAccount);

export default router;
