const express = require('express');
const router = express.Router();
const authorizeRole = require('../../middleware/authorizeRole');
const ROLES = require('../../models/Account/role');

const TodoController = require('../../controller/todoController');

router.use(authorizeRole([ROLES.USER]))

router.route('/')
    .get(TodoController.getTodoItemsByUsername)
    .post(TodoController.addTodoItem)
router.route('/:id')
    .get(TodoController.getTodoItemById)
    .put(TodoController.updateTodoItem)

module.exports = router;