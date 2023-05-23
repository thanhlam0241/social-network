const express = require('express');
const router = express.Router();
const authorizeRole = require('../../middleware/authorizeRole');
const ROLES = require('../../models/Account/role');

const userController = require('../../controller/Account/userController');

router.use(authorizeRole([ROLES.ADMIN]))

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put(userController.updateUserPassword)
    .delete(userController.deleteUser)
router.route('/:id')
    .get(userController.getUserById)



module.exports = router;