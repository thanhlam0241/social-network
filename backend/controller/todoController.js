const TodoItemSchema = require('../models/todoItem');
const userSchema = require('../models/Account/user');

const getTodoItemsByUsername = async (req, res) => {
    try {
        const todoItems = await TodoItemSchema.find({ username: req.body.username });
        if (todoItems.length > 0) {
            res.status(200).json(todoItems);
            return;
        }
        res.status(404).send("Todo item not found");
    }
    catch (err) {
        res.status(500).send();
    }
}

const addTodoItem = async (req, res) => {
    try {
        const username = req.body.username;
        const title = req.body.title;
        const description = req.body.description;
        if (!title || !username || !description) {
            res.status(400).send("Some field must not be empty");
            return;
        }
        const todoItem = {
            title: title,
            description: description,
            completed: req.body.completed || false,
            important: req.body.important || false,
            dueDate: new Date(),
            username: username
        }
        const newTodoItem = new TodoItemSchema(todoItem);
        await newTodoItem.validate();
        await newTodoItem.save();
        res.status(201).json(newTodoItem);
    }
    catch (err) {
        res.status(500).send();
    }
}

const getTodoItemById = async (req, res) => {
    try {
        const todoItem = await TodoItemSchema.findById(req.params.id);
        const username = req.user.username;
        if (todoItem?.username !== username) {
            res.status(401).send("You are not authorized to access this todo item");
            return;
        }
        if (todoItem) {
            res.status(200).json(todoItem);
            return;
        }
        res.status(404).send("Todo item not found");
    }
    catch (err) {
        res.status(500).send();
    }
}

const updateTodoItem = async (req, res) => {
    try {
        const username = req.user.username;
        console.log(req.body)
        await TodoItemSchema.findOneAndUpdate({ _id: req.params.id, username: username }, req.body).catch(err => { console.log('The todo is not of this user') });
        res.status(201).json('Update successfully');
    }
    catch (err) {
        res.status(500).send('Some thing went wrong, maybe from server');
    }
}

const deleteTodoItem = async (req, res) => {
    try {
        const username = req.body.username;
        if (!username) {
            res.status(400).send("Some field must not be empty");
            return;
        }
        const userExist = await userSchema.findOne({ username: username });
        if (userExist) {
            res.status(404).send("Username is not existed");
            return;
        }
        await TodoItemSchema.deleteOne({ _id: req.body._id });
        res.status(201).json('Delete successfully');
    }
    catch (err) {
        res.status(500).send();
    }
}

module.exports = {
    getTodoItemsByUsername,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    getTodoItemById
}