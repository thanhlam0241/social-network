const express = require('express');
const path = require('path');

const authenticate = require('../controller/Account/authenticate');
const userController = require('../controller/Account/userController');
const authenticateToken = require('../middleware/authenToken');

const router = express.Router();

/* This code is defining a router object in Express.js that handles HTTP requests for various
endpoints. */
router.get('^/$|server(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
/* This code is defining various routes for handling HTTP POST requests in an Express.js application. */
router.post('/login', authenticate.confirmLogin);

// router.get('/chat', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
// });

/* `router.post('/refresh-token', authenticate.refreshToken);` is defining a route for handling HTTP
POST requests to refresh an authentication token. The `authenticate.refreshToken` function is the
controller function that handles the logic for refreshing the token. */
router.post('/refresh-token', authenticate.refreshToken);

/* `router.post('/register', userController.createUser);` is defining a route for handling HTTP POST
requests to register a new user. The `userController.createUser` function is the controller function
that handles the logic for creating a new user. */
router.post('/register', userController.createUser);

/* `router.post('/changePassword', authenticateToken, userController.changePassword)` is defining a
route for handling HTTP POST requests to change the password of a user. The `authenticateToken`
middleware function is used to authenticate the user making the request. The
`userController.changePassword` function is the controller function that handles the logic for
changing the password of the authenticated user. */
router.post('/changePassword', authenticateToken, userController.changePassword)

/* `router.post('/logout', authenticateToken, authenticate.logout);` is defining a route for handling
HTTP POST requests to log out a user. The `authenticateToken` middleware function is used to
authenticate the user making the request. The `authenticate.logout` function is the controller
function that handles the logic for logging out the authenticated user. */
router.post('/logout', authenticateToken, authenticate.logout);

module.exports = router