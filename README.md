# Mock-Premier-League-Api serves the latest scores of fixtures of matches in a “Mock Premier League”


# To run and test the code, follow these steps:
```
1. Clone the repository from GitHub:
   git clone git@github.com:maximmajor/Mock-Premier-League-Api.git

3. run yarn (to Install dependencies)

4. Set environment variables:
   Create a .env file at the root of the project directory and add the following environment variables:
   MONGODB_URI=<mongodb-uri>
   Replace <mongodb-uri> with a valid MongoDB connection string.
   

5. run yarn tsc
   (This compiles the TypeScript code into JavaScript code. and create a dist folder where it is stored.)

6. run yarn start
   (This will start the server and listen for incoming requests.)


   TO RUN THE TEST CASES
7. run yarn test
```



# TO INTERACT WITH THE SERVER:
Once the server is running, you can interact with it using a tool like Postman 
or a browser extension. Here are some of the requests:

# Account Service
```
1. Create Account:
   POST https://mock-premier-league-api-production.up.railway.app/account/create
   Content-Type: application/json
  {
    "name": "Ugochukwu Amajor",
    "userName": "majorX",
    "email": "amajor@gmail.com",
    "password": "12345",
    "isAdmin" : true
}

2. Login Account:
   POST https://mock-premier-league-api-production.up.railway.app/account/login
   Content-Type: application/json
   {
    "email": "amajor@gmail.com",
    "password": "12345"
}

3. get Authenticated Account:
   GET https://mock-premier-league-api-production.up.railway.app/account

4. Get All Accounts:
   GET https://mock-premier-league-api-production.up.railway.app/account/all

3. get All Admin Accounts:
   GET https://mock-premier-league-api-production.up.railway.app/account/all/admin

4. Get All None Admin Accounts:
   GET https://mock-premier-league-api-production.up.railway.app/account/none/admin

5. Get All None Admin Accounts:
   PUT https://mock-premier-league-api-production.up.railway.app/account
```


# Team Service
```
1. Create Team:
   POST https://mock-premier-league-api-production.up.railway.app/team/create
   Content-Type: application/json
  {
  "teamName": "Arsenal",
  "teamMembers": [
    { "name": "Matteo Guendouzi", "role": "Midfielder" },
     { "name": "Granit Xhaka", "role": "Midfielder" }
  ]
}


2. Get Unique Team:
   GET https://mock-premier-league-api-production.up.railway.app/team/:teamId
   Content-Type: application/json
 

3. get All Team:
   GET https://mock-premier-league-api-production.up.railway.app/team


4. Get All Teams By Account Id:
   GET https://mock-premier-league-api-production.up.railway.app/team/all/account

3. Update Team:
   PUT https://mock-premier-league-api-production.up.railway.app/team

4. Remove Team:
   GET https://mock-premier-league-api-production.up.railway.app/remove/:teamId

5. Robustly Teams:
   GET https://mock-premier-league-api-production.up.railway.app/team/robust/search?teamId=649372921f63360e5b36de90
   GET https://mock-premier-league-api-production.up.railway.app/team/robust/search?teamName=Arsenal
```



# Fixture Service
```
1. Create Fixture:
   POST https://mock-premier-league-api-production.up.railway.app/fixture/create
   Content-Type: application/json
  {
  "team1": "649372921f63360e5b36de90",
  "team2": "64936f0ea62de83d4653c93c",
  "date": "23/4/2023 10:10:00"
}


2. Get All Fixtures:
   GET https://mock-premier-league-api-production.up.railway.app/fixture
   Content-Type: application/json
 

3. Get Unique Fixture:
   GET https://mock-premier-league-api-production.up.railway.app/fixture/get/id/:fixtureId


4. Get All Fixture By Account Id:
   GET https://mock-premier-league-api-production.up.railway.app/fixture/all/account

3. Update Fixture:
   PUT https://mock-premier-league-api-production.up.railway.app/fixture

4. Remove Fixture:
   GET https://mock-premier-league-api-production.up.railway.app/remove/:fixtureId

5. Robustly Fixtures:
   GET https://mock-premier-league-api-production.up.railway.app/fixture/robust/search?teamId=649372921f63360e5b36de90
   GET https://mock-premier-league-api-production.up.railway.app/fixture/robust/search?status=Completed
```




# File Structure:
```
├── src/
│   │   ├── models/
│   │   │   └── accountModel.ts
│   │   │   └── teamModel.ts
│   │   │   └── fixtureModel.ts
│   │   ├── controllers/
│   │   │   └── accountController.ts
│   │   │   └── teamController.ts
│   │   │   └── fixtureController.ts
│   │   ├── repositories/
│   │   │   └── accountRepository.ts
│   │   │   └── teamRepository.ts
│   │   │   └── fixtureRepository.ts
│   │   ├── service/
│   │   │   └── accountServices.ts
│   │   │   └── teamServices.ts
│   │   │   └── fixtureServices.ts
│   │   ├── routes/
│   │   │   └── accountRoute.ts
│   │   │   └── teamRoute.ts
│   │   │   └── fixtureRoute.ts
│   │   ├── interfaces/
│   │   │   ├── accountInterface.ts
│   │   │   ├── teamInterface.ts
│   │   │   └── fixtureInterface.ts
│   │   ├── middlewares/
│   │   │   └── authentication.ts
│   │   │   └── authorization.ts
│   │   │   └── HttpException.ts
│   │   │   └── errorHandlers.ts
│   │   │   └── rateLimiter.ts
│   │   │   └── rateLimiterError.ts
│   │   │   └── validateRequestBody.ts
│   │   ├── config/
│   │   │   └── db.ts
│   │   └── utils/
│   │       └── server.ts
│   ├── app.ts
│   └── test/
│       └── account.test.ts
|       └── team.test.ts
|       └── fixture.test.ts
└──
```




# Breakdown of what each folder and file contains:
```
1. src/:
   This directory contains all the source code for the project.

3. controllers/:
   This sub-directory contains code related to handling requests and responses from the client.

4. Controller.ts:
   This contains functions to handle CRUD (Create, Read, Update, Delete) operations.

5. repositories/:
   This sub-directory contains code related to interacting with the database

6. Repository.ts:
   This contains functions to read from and write to the database for short links.

7. routes/:
   This sub-directory contains code related to defining and handling HTTP routes for the feature.

8. Routes.ts:
   This contains functions to define the routes for the short link feature.

9. interfaces/:
   This sub-directory contains code related to defining data structures, interfaces, types for the feature.

10. Interface.ts, RepositoryInterface.ts, and ModelInterface.ts:
    These define the interfaces for the controller, repository, and data model.

11. middlewares/:
    This sub-directory contains code related to handling middleware logic for the feature.

12. errorHandlers.ts and HttpException.ts:
    These contain code to handle errors and exceptions that may occur during the handling of HTTP requests.

13. config/:
    db.ts:
    This contains configuration settings for connecting to the database.

14. utils/:
    This sub-directory contains utility functions/other miscellaneous code related to the feature.

15. server.ts:
    This contains code to set up and start the HTTP server for the feature.

16. app.ts:
    This file contains code to start the entire application and tie together the various features and modules.

17. __test__:
    This is a sub-directory that likely contains code for testing the functionality of the ShortLink feature.

18. test.ts:
    contains test cases to ensure the short link feature works as expected
```



# TECHNOLOGY USE
```
1. Node.js: a JavaScript runtime environment that allows running JavaScript code outside of a web browser

2. Express.js: a popular web application framework for Node.js used for building APIs and web applications

3. TypeScript: a superset of JavaScript that adds optional static typing and other features to JavaScript code

4. MongoDB: a NoSQL document database used for storing and retrieving data

5. Mongoose: a Node.js library used for modeling and interacting with MongoDB databases

6. Jest: a JavaScript testing framework used for unit and integration testing of Node.js applications

7. Supertest: a library used for testing Node.js HTTP servers such as Express.js applications1
```