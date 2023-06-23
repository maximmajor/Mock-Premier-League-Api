import express, { Router } from 'express';
import fixtureController from '../controllers/fixtureController';
import authenticate from '../middlewares/authentication';
import authorization from '../middlewares/authorization';

const router: Router = express.Router();
const FixtureController = new fixtureController();



// Create a new Fixture
router.post('/create', authenticate, authorization, FixtureController.createFixture);


// Authenticate Fixture
router.get('/', authenticate, FixtureController.getAllFixtures);

// pending Fixture
router.get('/all/pending', authenticate, FixtureController.getPendingFixtures);


// completed Fixture
router.get('/all/completed', authenticate, FixtureController.getCompletedFixtures);


// Get an Fixture by Account ID
router.get('/get/id/:fixtureId', authenticate, FixtureController.getFixtureById);


// Get an Fixture by Account ID
router.get('/account/id', authenticate, authorization, FixtureController.getFixtureByAccountId);


// Update a Fixture
router.put('/:fixtureId', authenticate, authorization, FixtureController.updateFixture);


// Remove a Fixture
router.delete('/remove/:teamId', authenticate, FixtureController.removeFixture);

// search a Fixture
router.get('/robust/search', FixtureController.searchFixture);

export default router;


