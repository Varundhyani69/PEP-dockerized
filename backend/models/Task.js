import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema(
    {
        title: String,
        completed: { type: Boolean, default: false },
    },
    { _id: true }
);

const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: String,

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        subtasks: [subtaskSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);