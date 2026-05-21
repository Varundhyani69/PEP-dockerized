import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../store/appSlice";

function Notification() {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.app.notifications);

    useEffect(() => {
        if (!notifications.length) return;

        const timers = notifications.map((n) =>
            setTimeout(() => {
                dispatch(removeNotification(n.id));
            }, 3000)
        );

        return () => timers.forEach(clearTimeout);
    }, [notifications, dispatch]);

    if (!notifications.length) return null;

    return (
        <div className="fixed top-16 right-4 space-y-2 z-50 max-w-sm">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className={`p-4 rounded-lg shadow-lg text-white ${notif.type === "success"
                            ? "bg-green-600"
                            : notif.type === "error"
                                ? "bg-red-600"
                                : "bg-blue-600"
                        }`}
                >
                    {notif.message}
                </div>
            ))}
        </div>
    );
}

export default Notification;
