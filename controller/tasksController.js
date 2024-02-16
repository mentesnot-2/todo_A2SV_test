// controllers/tasksController.js
const knex = require('../db/knex');

module.exports = {
  createTask: async (req, res) => {
    try {
      const { title, description, due_date } = req.body;
      const task = await knex('tasks').insert({ title, description, due_date }, '*');
      res.status(201).json(task[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await knex('tasks').select();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await knex('tasks').where({ id }).first();
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, due_date } = req.body;
      const updatedTask = await knex('tasks')
        .where({ id })
        .update({ title, description, due_date }, '*');
      if (updatedTask.length > 0) {
        res.status(200).json(updatedTask[0]);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await knex('tasks').where({ id }).del('*');
      if (deletedTask.length > 0) {
        res.status(200).json(deletedTask[0]);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
