const express = require('express')
const { getAllTasks, getSingleTask, createTask, updateTask, deleteTasks } = require('../controllers/tasks')

const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTasks)

module.exports = router
