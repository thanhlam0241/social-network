const express = require('express');
const router = express.Router();
const authorizeRole = require('../../../middleware/authorizeRole');
const ROLES = require('../../../models/const/role');

const userController = require('../../../controller/Account/userController');
const userInformationController = require('../../../controller/Account/userInformationController');


router.use(authorizeRole([ROLES.USER])).route('/information')
    .get(userInformationController.getUserInformationById)
    .patch(userInformationController.updateUserInformation)

router.use(authorizeRole([ROLES.ADMIN]))

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put(userController.updateUserPassword)
    .delete(userController.deleteUser)
router.route('/:id')
    .get(userController.getUserById)



module.exports = router;