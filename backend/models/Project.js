import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: String,
        status: String,
        progress: Number,
        due: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [String],
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);