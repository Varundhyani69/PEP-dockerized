import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getProjects = async (req, res) => {
    const projects = await Project.find({ owner: req.user._id });
    res.json(projects);
};

export const createProject = async (req, res) => {
    const project = await Project.create({
        ...req.body,
        owner: req.user._id,
    });
    res.status(201).json(project);
};

export const deleteProject = async (req, res) => {
    await Task.deleteMany({ projectId: req.params.id });
    await Project.deleteOne({ _id: req.params.id, owner: req.user._id });
    res.json({ success: true });
};