import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import { updateTask } from "../store/appSlice";
import { api } from "../utils/api";

const getId = (item) => item._id || item.id;

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { tasks, projects } = useSelector((state) => state.app);
    const task = tasks.find((t) => getId(t) === id);

    const [subtaskTitle, setSubtaskTitle] = useState("");
    const [assignEmail, setAssignEmail] = useState("");

    if (!task) {
        return (
            <DashboardLayout>
                <p className="text-gray-500">Task not found</p>
            </DashboardLayout>
        );
    }

    const projectName = projects.find(
        (p) => getId(p) === task.projectId
    )?.name;

    const addSubtask = async () => {
        if (!subtaskTitle.trim()) return;

        const updated = await api(
            `/api/tasks/${getId(task)}/subtasks`,
            {
                method: "POST",
                body: JSON.stringify({ title: subtaskTitle }),
            }
        );

        dispatch(updateTask(updated));
        setSubtaskTitle("");
    };

    const toggleSubtask = async (subtaskId) => {
        const updated = await api(
            `/api/tasks/${getId(task)}/subtasks/${subtaskId}`,
            { method: "PATCH" }
        );

        dispatch(updateTask(updated));
    };

    const assignTask = async () => {
        if (!assignEmail.trim()) return;

        const updated = await api(
            `/api/tasks/${getId(task)}/assign`,
            {
                method: "POST",
                body: JSON.stringify({ email: assignEmail }),
            }
        );

        dispatch(updateTask(updated));
        setAssignEmail("");
    };

    return (
        <DashboardLayout>
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
                ← Back
            </Button>

            <div className="bg-white rounded-2xl p-6 max-w-2xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">{task.title}</h1>
                    <p className="text-sm text-gray-500">
                        {task.status} • {projectName}
                    </p>
                </div>

                {/* ASSIGN */}
                <div>
                    <h3 className="font-semibold mb-2">Assign Task</h3>
                    <div className="flex gap-2">
                        <input
                            value={assignEmail}
                            onChange={(e) => setAssignEmail(e.target.value)}
                            placeholder="user@email.com"
                            className="flex-1 border rounded-lg px-3 py-2"
                        />
                        <Button onClick={assignTask}>Assign</Button>
                    </div>

                    {task.assignee && (
                        <p className="text-sm mt-2 text-gray-600">
                            Assigned to: {task.assignee.email}
                        </p>
                    )}
                </div>

                {/* SUBTASKS */}
                <div>
                    <h3 className="font-semibold mb-3">Subtasks</h3>

                    <ul className="space-y-2 mb-4">
                        {(task.subtasks || []).map((st) => (
                            <li
                                key={st._id}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={() => toggleSubtask(st._id)}
                                />
                                <span
                                    className={
                                        st.completed
                                            ? "line-through text-gray-400"
                                            : ""
                                    }
                                >
                                    {st.title}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-2">
                        <input
                            value={subtaskTitle}
                            onChange={(e) => setSubtaskTitle(e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2"
                            placeholder="New subtask"
                        />
                        <Button onClick={addSubtask}>Add</Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default TaskDetails;