const express = require('express');
const router = express.Router();
const authorizeRole = require('../../middleware/authorizeRole');
const ROLES = require('../../models/const/role');

const TodoController = require('../../controller/todoController');

router.use(authorizeRole([ROLES.USER]))

router.route('/')
    .get(TodoController.getTodoItems)
    .post(TodoController.addTodoItem)
router.route('/:id')
    .get(TodoController.getTodoItemById)
    .put(TodoController.updateTodoItem)
    .delete(TodoController.deleteTodoItem)

module.exports = router;