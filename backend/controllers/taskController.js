import Task from "../models/Task.js";
import User from "../models/User.js";

/* ======================
   GET TASKS
====================== */
export const getTasks = async (req, res) => {
    const tasks = await Task.find({ owner: req.user._id })
        .populate("assignee", "email");

    res.json(tasks);
};

/* ======================
   CREATE TASK
====================== */
export const createTask = async (req, res) => {
    const task = await Task.create({
        ...req.body,
        owner: req.user._id,
    });

    res.status(201).json(task);
};

/* ======================
   DELETE TASK
====================== */
export const deleteTask = async (req, res) => {
    await Task.deleteOne({
        _id: req.params.id,
        owner: req.user._id,
    });

    res.json({ success: true });
};

/* ======================
   ASSIGN TASK BY EMAIL
====================== */
export const assignTask = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
    });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.assignee = user._id;
    await task.save();

    await task.populate("assignee", "email");

    res.json(task);
};

/* ======================
   SUBTASKS
====================== */
export const addSubtask = async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
    });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.subtasks.push({ title: req.body.title });
    await task.save();

    res.json(task);
};

export const toggleSubtask = async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
    });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) {
        return res.status(404).json({ message: "Subtask not found" });
    }

    subtask.completed = !subtask.completed;
    await task.save();

    res.json(task);
};