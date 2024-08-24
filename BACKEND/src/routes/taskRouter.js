const express = require('express')
const Auth = require('../middlewares/authMiddleware')
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController')


const taskRouter = express.Router()

taskRouter.get('/', Auth(['admin', 'user']) , getAllTasks)
taskRouter.post('/', Auth(['admin', 'user']) , createTask)
taskRouter.put('/:id', Auth(['admin']) , updateTask)
taskRouter.delete('/:id', Auth(['admin']) , deleteTask)

module.exports = taskRouter
