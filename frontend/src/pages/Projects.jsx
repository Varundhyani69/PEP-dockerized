import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addProject } from "../store/appSlice";

const getId = (item) => item._id || item.id;

function Projects() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projects, tasks } = useSelector((state) => state.app);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const createProject = () => {
        if (!name.trim()) return;
        dispatch(addProject({ name, status: "Active", progress: 0, due: "TBD" }));
        setName("");
        setOpen(false);
    };

    return (
        <DashboardLayout>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">Projects</h1>
                    <p className="text-sm text-var(--text-muted)">
                        Manage all your projects
                    </p>
                </div>

                <Button onClick={() => setOpen(true)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    New Project
                </Button>
            </div>

            {/* GRID */}
            {projects.length === 0 ? (
                <div className="text-center py-20 text-var(--text-muted)">
                    No projects yet. Create your first one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((p) => {
                        const pid = getId(p);
                        const taskCount = tasks.filter(
                            (t) => (t.projectId === pid)
                        ).length;

                        return (
                            <div
                                key={pid}
                                onClick={() => navigate(`/projects/${pid}`)}
                                className="group relative bg-var(--bg-card) p-6 rounded-2xl cursor-pointer
                                           border border-var(--border)
                                           hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                {/* Accent bar */}
                                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-var(--accent)" />

                                <h2 className="font-semibold text-lg mb-1">
                                    {p.name}
                                </h2>

                                <p className="text-sm text-var(--text-muted)">
                                    {taskCount} tasks
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MODAL */}
            <Modal open={open} onClose={() => setOpen(false)} title="Create Project">
                <label className="block text-sm text-var(--text-muted) mb-1">
                    Project name
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 mb-2 bg-var(--bg-input) outline rounded-lg"
                    placeholder="Create Project"
                />
                <Button onClick={createProject} disabled={!name.trim()}>
                    Create
                </Button>
            </Modal>
        </DashboardLayout>
    );
}

export default Projects;