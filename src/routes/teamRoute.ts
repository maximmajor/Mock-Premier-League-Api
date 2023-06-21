import express, { Router } from 'express';
import teamController from '../controllers/teamController';
import authenticate from '../middlewares/authentication';
import authorization from '../middlewares/authorization';

const router: Router = express.Router();
const TeamController = new teamController();



// Create a new Team
router.post('/create', authenticate, authorization,  TeamController.createTeam);


// Authenticate Team
router.get('/', authenticate, TeamController.getAllTeams);


// Get an Team by Account ID
router.get('/:teamId',  authenticate, TeamController.getTeamById);


// Get an Team by Account ID
router.get('/account/id', authenticate, authorization, TeamController.getTeamByAccountId);


// Update a Team
router.put('/', authenticate, authorization, TeamController.updateTeam);

export default router;
