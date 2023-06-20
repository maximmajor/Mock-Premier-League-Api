import express, { Router } from 'express';
import accountController from '../controllers/accout';

const router: Router = express.Router();
const AccountController = new accountController();

// Register a new user
router.post('/register', AccountController.createAccount);

// Get all users
router.get('/', AccountController.getAllAccounts);

// Get a user by ID
router.get('/:userId', AccountController.getAccountById);

// Get all admin
router.get('/admin', AccountController.getAllAdmin);

// Get all None Admin
router.get('/:userId', AccountController.getAllNoneAdmin);

// Update a user
router.put('/non/admin', AccountController.updateAccount);

export default router;
