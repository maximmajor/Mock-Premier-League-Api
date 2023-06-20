import express, { Router } from 'express';
import accountController from '../controllers/accout';

const router: Router = express.Router();
const AccountController = new accountController();

// Register a new user
router.post('/create', AccountController.createAccount);

// Get all users
router.get('/', AccountController.getAllAccounts);

// Get a user by ID
router.get('/:accountId', AccountController.getAccountById);

// Get all admin
router.get('/admin', AccountController.getAllAdmin);

// Get all None Admin
router.get('/none/admin', AccountController.getAllNoneAdmin);

// Update a user
router.put('/:accountId', AccountController.updateAccount);

export default router;
