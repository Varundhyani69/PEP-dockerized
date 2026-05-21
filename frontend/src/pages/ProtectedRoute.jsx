import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../utils/api";
import { setProjects, setTasks } from "../store/appSlice";

function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const init = async () => {
            try {
                await api("http://localhost:5000/api/auth/me");

                const [projects, tasks] = await Promise.all([
                    api("http://localhost:5000/api/projects"),
                    api("http://localhost:5000/api/tasks"),
                ]);

                dispatch(setProjects(projects));
                dispatch(setTasks(tasks));

                setStatus("ok");
            } catch (err) {
                setStatus("fail");
            }
        };

        init();
    }, [dispatch]);

    if (status === "loading") return null;
    if (status === "fail") return <Navigate to="/" replace />;

    return children;
}

export default ProtectedRoute;