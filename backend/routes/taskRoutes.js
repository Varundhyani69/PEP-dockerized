import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getTasks,
    createTask,
    deleteTask,
    assignTask,
    addSubtask,
    toggleSubtask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

/* 🔥 NEW */
router.post("/:id/assign", assignTask);
router.post("/:id/subtasks", addSubtask);
router.patch("/:id/subtasks/:subtaskId", toggleSubtask);

export default router;