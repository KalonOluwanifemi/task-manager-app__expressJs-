const express = require("express");
const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");

//GET ALL TASKS
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

//GET SINGLE TASK
const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const singleTask = await Task.findOne({ _id: taskID });
  if (!singleTask) {
    return res.status(404).json({ message: `No task with ${taskID}` });
  }
  res.status(200).json({ singleTask });
});

//CREATE TASK
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//UPDATE TASK
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ message: `No task with ${taskID}` });
  }
  res.status(200).json({ task });
});

//DELETE TASK
const deleteTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ message: `no task with id ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTasks,
};
