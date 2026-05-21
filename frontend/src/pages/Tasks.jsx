import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addTask } from "../store/appSlice";
import { api } from "../utils/api";

const FILTERS = ["All", "Pending", "In Progress", "Completed"];
const getId = (item) => item._id || item.id;

function Tasks() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { tasks, projects } = useSelector((state) => state.app);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [projectId, setProjectId] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredTasks = tasks.filter((t) =>
        filter === "All" ? true : t.status === filter
    );

    const handleAddTask = async () => {
        if (!title.trim() || !projectId) return;

        const task = await api("http://localhost:5000/api/tasks", {
            method: "POST",
            body: JSON.stringify({
                title,
                status: "Pending",
                projectId,
            }),
        });

        dispatch(addTask(task));

        setTitle("");
        setProjectId("");
        setOpen(false);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-semibold">Tasks</h1>
                        <p className="text-sm text-gray-500">
                            Manage and track all tasks
                        </p>
                    </div>

                    <Button onClick={() => setOpen(true)}>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Task
                    </Button>
                </div>

                {/* FILTERS */}
                <div className="flex gap-2 flex-wrap">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm border transition
                                ${filter === f
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* TASK LIST */}
                <div className="bg-white rounded-xl border border-gray-200">
                    {filteredTasks.length === 0 ? (
                        <div className="py-16 text-center text-gray-500">
                            No tasks found.
                        </div>
                    ) : (
                        filteredTasks.map((t) => {
                            const tid = getId(t);
                            const projectName = projects.find(
                                (p) => getId(p) === t.projectId
                            )?.name;

                            return (
                                <div
                                    key={tid}
                                    onClick={() => navigate(`/tasks/${tid}`)}
                                    className="flex justify-between items-center px-6 py-4
                                               border-b last:border-b-0 cursor-pointer
                                               hover:bg-gray-50 transition"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {t.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {projectName || "No project"}
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-full
                                            ${t.status === "Pending" &&
                                            "bg-yellow-100 text-yellow-700"
                                            }
                                            ${t.status === "In Progress" &&
                                            "bg-blue-100 text-blue-700"
                                            }
                                            ${t.status === "Completed" &&
                                            "bg-green-100 text-green-700"
                                            }
                                        `}
                                    >
                                        {t.status}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* ADD TASK MODAL */}
            <Modal open={open} onClose={() => setOpen(false)} title="Add Task">
                <label className="block text-sm text-gray-600 mb-1">
                    Project
                </label>
                <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                >
                    <option value="">Select project</option>
                    {projects.map((p) => (
                        <option key={getId(p)} value={getId(p)}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <label className="block text-sm text-gray-600 mb-1">
                    Task title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Enter task title"
                />

                <Button
                    onClick={handleAddTask}
                    disabled={!title.trim() || !projectId}
                >
                    Add Task
                </Button>
            </Modal>
        </DashboardLayout>
    );
}

export default Tasks;