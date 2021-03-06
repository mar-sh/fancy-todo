const moment = require('moment');
const Todo = require('../models/Todo');

class TodoController {

  static getAllTodos(req, res, next) {
    Todo.find({})
      .then((todos) => {
        res.status(200).json({
          message: 'FETCHED',
          todos,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static getTodoById(req, res, next) {
    const { id } = req.params;

    Todo.findById(id)
      .then((todo) => {
        res.status(200).json({
          message: 'FETCHED',
          todo,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static postCreateTodo(req, res, next) {
    const userId = req.authenticated.id;

    const {
      name,
      description,
      date,
    } = req.body;

    console.log(date);

    const newTodo = new Todo({
      name,
      description,
      date: moment(date, 'MM-DD-YYYY'),
      userId,
    });

    console.log(newTodo.date)

    newTodo.save()
      .then((todo) => {
        res.status(201).json({
          message: 'CREATED',
          todo,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static putEditTodoById(req, res, next) {
    const { id } = req.params;

    const {
      name,
      description,
      date,
      status,
    } = req.body;

    const updates = {
      name,
      description,
      date,
      status,
    }

    console.log(updates)

    for(let key in updates) {
      if(String(updates[key]) == 'undefined') {
        delete updates[key];
      };
    };
    console.log(updates)

    Todo.findByIdAndUpdate(id, updates, { new: true })
      .then((updated) => {
        res.status(200).json({
          message: 'UPDATED',
          todo: updated,
        });
      })
      .catch((error) => {
        next(error);
      });
  };
  
  static deleteTodoById(req, res, next) {
    const{ id } = req.params;

    Todo.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: 'DELETED' });
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = TodoController;
