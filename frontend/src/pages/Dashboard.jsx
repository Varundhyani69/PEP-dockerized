import { useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import {
    FolderIcon,
    ClipboardDocumentListIcon,
    ExclamationTriangleIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { api } from "../utils/api";

function Dashboard() {
    const { projects, tasks } = useSelector((s) => s.app);

    const [projectOpen, setProjectOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [projectId, setProjectId] = useState("");

    const createProject = async () => {
        await api("/api/projects", {
            method: "POST",
            body: JSON.stringify({
                name: projectName,
                status: "Active",
                progress: 0,
                due: "TBD",
            }),
        });

        setProjectName("");
        setProjectOpen(false);
    };

    const createTask = async () => {
        await api("/api/tasks", {
            method: "POST",
            body: JSON.stringify({
                title: taskTitle,
                status: "Pending",
                projectId,
            }),
        });

        setTaskTitle("");
        setTaskOpen(false);
    };

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center bg-var(--bg-card) p-6 rounded-xl">
                <div>
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-white/60">Overview</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setProjectOpen(true)}>
                        <PlusIcon className="w-4 h-4 mr-2" /> Project
                    </Button>
                    <Button variant="secondary" onClick={() => setTaskOpen(true)}>
                        <PlusIcon className="w-4 h-4 mr-2" /> Task
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
                <StatCard title="Projects" value={projects.length} icon={FolderIcon} />
                <StatCard title="Tasks" value={tasks.length} icon={ClipboardDocumentListIcon} />
                <StatCard
                    title="Pending"
                    value={tasks.filter((t) => t.status === "Pending").length}
                    icon={ExclamationTriangleIcon}
                />
            </div>

            {/* MODALS */}
            <Modal open={projectOpen} onClose={() => setProjectOpen(false)} title="Create Project">
                <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3 py-2 mb-2 bg-var(--bg-input) rounded-lg"
                    placeholder="Project name"
                />
                <Button onClick={createProject} disabled={!projectName.trim()}>
                    Create
                </Button>
            </Modal>

            <Modal open={taskOpen} onClose={() => setTaskOpen(false)} title="Create Task">
                <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-var(--bg-input) rounded-lg mb-3"
                >
                    <option value="">Select project</option>
                    {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <input
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-var(--bg-input) rounded-lg"
                    placeholder="Task title"
                />
                <Button onClick={createTask} disabled={!taskTitle.trim()}>
                    Create Task
                </Button>
            </Modal>
        </DashboardLayout>
    );
}

export default Dashboard;