import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import { moveTask } from "../store/appSlice";

const COLUMNS = [
    { key: "Pending", color: "border-yellow-400" },
    { key: "In Progress", color: "border-blue-400" },
    { key: "Completed", color: "border-green-400" },
];

function Board() {
    const dispatch = useDispatch();
    const { tasks, projects } = useSelector((state) => state.app);
    const [dragged, setDragged] = useState(null);

    return (
        <DashboardLayout>
            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Kanban Board
                    </h1>
                    <p className="text-sm text-gray-500">
                        Drag tasks between stages to update progress
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COLUMNS.map((col) => {
                        const columnTasks = tasks.filter(
                            (t) => t.status === col.key
                        );

                        return (
                            <div
                                key={col.key}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => {
                                    if (!dragged) return;
                                    dispatch(
                                        moveTask({
                                            id: dragged._id || dragged.id,
                                            status: col.key,
                                        })
                                    );
                                    setDragged(null);
                                }}
                                className={`bg-gray-50 rounded-xl border-t-4 ${col.color} p-4`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-800">
                                        {col.key}
                                    </h3>
                                    <span className="text-xs font-medium bg-white px-2 py-0.5 rounded border">
                                        {columnTasks.length}
                                    </span>
                                </div>

                                {/* TASKS */}
                                <div className="space-y-3 min-h-120px">
                                    {columnTasks.length === 0 && (
                                        <div className="text-sm text-gray-400 text-center py-6">
                                            No tasks here
                                        </div>
                                    )}

                                    {columnTasks.map((t) => {
                                        const projectName = projects.find(
                                            (p) => p.id === t.projectId
                                        )?.name;

                                        return (
                                            <div
                                                key={t._id || t.id}
                                                draggable
                                                onDragStart={() => setDragged(t)}
                                                onDragEnd={() => setDragged(null)}
                                                className={`bg-white rounded-lg p-4 border 
                                                    shadow-sm cursor-grab active:cursor-grabbing
                                                    hover:shadow-md transition
                                                    ${dragged?.id === t.id
                                                        ? "opacity-50"
                                                        : ""
                                                    }`}
                                            >
                                                <p className="font-medium text-gray-900">
                                                    {t.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {projectName || "No Project"}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Board;
