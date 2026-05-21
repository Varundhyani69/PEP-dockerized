import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getProjects,
    createProject,
    deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.use(protect);
router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);

export default router;