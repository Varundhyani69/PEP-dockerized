import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import {
    addTask,
    addMember,
    addMemberToProject,
    removeProject,
} from "../store/appSlice";
import { api } from "../utils/api";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthLabel = "March 2026";
const getId = (item) => item._id || item.id;

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.app);

    const projectId = id;
    const project = state.projects.find((p) => getId(p) === projectId);
    const projectTasks = state.tasks.filter(
        (t) => t.projectId === projectId
    );

    const members =
        project?.members
            ?.map((mid) => state.members.find((m) => m.id === mid))
            .filter(Boolean) || [];

    const [taskOpen, setTaskOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");

    if (!project) {
        return (
            <DashboardLayout>
                <p className="text-var(--text-muted)">Project not found</p>
            </DashboardLayout>
        );
    }

    const handleAddTask = () => {
        if (!title.trim()) return;
        dispatch(addTask({ title, status: "Pending", projectId }));
        setTitle("");
        setTaskOpen(false);
    };

    const inviteMember = () => {
        if (!email.trim()) return;
        const memberId = Date.now();
        dispatch(addMember({ id: memberId, email }));
        dispatch(addMemberToProject({ projectId, memberId }));
        setEmail("");
        setInviteOpen(false);
    };

    const handleDeleteProject = async () => {
        await api(`http://localhost:5000/api/projects/${projectId}`, {
            method: "DELETE",
        });

        dispatch(removeProject(projectId));
        navigate("/projects", { replace: true });
    };

    return (
        <DashboardLayout>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold">{project.name}</h1>
                    <p className="text-sm text-var(--text-muted)">
                        {projectTasks.length} tasks
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setInviteOpen(true)}>
                        Invite
                    </Button>
                    <Button onClick={() => setTaskOpen(true)}>+ Task</Button>
                    <Button
                        variant="danger"
                        onClick={() => setDeleteOpen(true)}
                    >
                        Delete Project
                    </Button>
                </div>
            </div>

            {/* MEMBERS */}
            <div className="mb-10">
                <h3 className="font-semibold mb-3">Members</h3>
                <div className="flex gap-2">
                    {members.map((m) => (
                        <div
                            key={m.id}
                            className="w-10 h-10 rounded-full
                                       bg-var(--accent)/20 border border-var(--accent)
                                       flex items-center justify-center
                                       text-sm font-medium"
                        >
                            {m.email[0].toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

            {/* CALENDAR */}
            <div className="mb-12">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold">Project Calendar</h3>
                    <span className="text-sm text-var(--text-muted)">
                        {monthLabel}
                    </span>
                </div>

                <div className="bg-var(--bg-card) rounded-2xl border border-var(--border)">
                    <div className="grid grid-cols-7 bg-var(--bg-input)">
                        {days.map((day) => (
                            <div
                                key={day}
                                className="p-3 text-center text-sm font-semibold"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 h-56">
                        {days.map((day) => (
                            <div
                                key={`cell-${day}`}
                                className="border-t border-r p-2"
                            >
                                {projectTasks.slice(0, 2).map((t) => (
                                    <div
                                        key={`cal-${getId(t)}-${day}`}
                                        className="text-xs px-2 py-1 rounded-md
                                                   bg-red-100 text-red-800 truncate"
                                    >
                                        {t.title}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOARD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {["Pending", "In Progress", "Completed"].map((status) => (
                    <div key={status} className="bg-var(--bg-card) rounded-2xl p-4">
                        <h3 className="font-medium mb-3">{status}</h3>
                        {projectTasks
                            .filter((t) => t.status === status)
                            .map((t) => (
                                <div
                                    key={`${status}-${getId(t)}`}
                                    className="bg-white p-3 rounded-xl mb-2 text-sm"
                                >
                                    {t.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {/* MODALS */}
            <Modal open={taskOpen} onClose={() => setTaskOpen(false)} title="Add Task">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 mb-4
                               bg-var(--bg-input) border border-var(--border)"
                    placeholder="Task title"
                />
                <Button onClick={handleAddTask}>Add</Button>
            </Modal>

            <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite Member">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 mb-4
                               bg-var(--bg-input) border border-var(--border)"
                    placeholder="Email address"
                />
                <Button onClick={inviteMember}>Invite</Button>
            </Modal>

            <Modal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                title="Delete Project"
            >
                <p className="text-sm text-var(--text-muted) mb-4">
                    This will permanently delete the project and all its tasks.
                    This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProject}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default ProjectDetails;