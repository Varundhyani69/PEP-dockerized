import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { api } from "../utils/api";

function Settings() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [name, setName] = useState("");

    /* FETCH AUTH USER */
    useEffect(() => {
        api("/api/auth/me")
            .then((data) => {
                setUser(data.user);
                setName(data.user.name);
            })
            .catch(() => {
                navigate("/", { replace: true });
            });
    }, [navigate]);

    const handleSave = () => {
        if (!name.trim()) return;
        setUser((prev) => ({ ...prev, name }));
        setEditOpen(false);
    };

    const handleLogout = async () => {
        await api("/api/auth/logout", {
            method: "POST",
        });
        navigate("/", { replace: true });
    };

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="space-y-8 w-full">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Settings
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage your account preferences
                    </p>
                </div>

                {/* PROFILE CARD */}
                <div className="bg-white border border-gray-200 rounded-xl w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-900">
                            Profile
                        </h2>
                        <Button
                            variant="secondary"
                            onClick={() => setEditOpen(true)}
                        >
                            Edit
                        </Button>
                    </div>

                    <div className="space-y-1 text-sm">
                        <p className="text-gray-700">
                            <span className="text-gray-500">Name:</span>{" "}
                            {user.name}
                        </p>
                        <p className="text-gray-700">
                            <span className="text-gray-500">Email:</span>{" "}
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* DANGER ZONE */}
                <div className="bg-white border border-red-200 rounded-xl p-6">
                    <h2 className="font-semibold text-red-600 mb-2">
                        Danger Zone
                    </h2>

                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* EDIT PROFILE MODAL */}
            <Modal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                title="Edit Profile"
            >
                <label className="block text-sm text-gray-600 mb-1">
                    Name
                </label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4
                     focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <Button onClick={handleSave} disabled={!name.trim()}>
                    Save Changes
                </Button>
            </Modal>
        </DashboardLayout>
    );
}

export default Settings;