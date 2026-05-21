import { useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];

function Timeline() {
    const { projects } = useSelector((state) => state.app);
    const [dragged, setDragged] = useState(null);

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Project Timeline
                    </h1>
                    <p className="text-sm text-gray-500">
                        Visual roadmap of project schedules
                    </p>
                </div>

                {/* TIMELINE */}
                <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
                    {/* WEEK HEADER */}
                    <div className="flex border-b bg-gray-50">
                        <div className="w-56 px-4 py-3 font-medium text-gray-600 border-r">
                            Project
                        </div>
                        {WEEKS.map((w) => (
                            <div
                                key={w}
                                className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 text-center border-r last:border-r-0"
                            >
                                {w}
                            </div>
                        ))}
                    </div>

                    {/* ROWS */}
                    {projects.length === 0 ? (
                        <div className="py-20 text-center text-gray-500">
                            No projects available
                        </div>
                    ) : (
                        projects.map((p) => (
                            <div
                                key={p.id}
                                className="flex border-b last:border-b-0"
                            >
                                {/* PROJECT NAME */}
                                <div className="w-56 px-4 py-4 font-medium text-gray-900 border-r bg-gray-50">
                                    {p.name}
                                </div>

                                {/* WEEKS */}
                                <div className="flex-1 relative flex">
                                    {WEEKS.map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex-1 border-r last:border-r-0 h-16"
                                        />
                                    ))}

                                    {/* PROJECT BAR */}
                                    <div
                                        draggable
                                        onDragStart={() => setDragged(p)}
                                        onDragEnd={() => setDragged(null)}
                                        className="absolute left-[25%] top-4 h-8 w-[50%]
                                                   bg-indigo-500 rounded-lg
                                                   text-white text-xs font-medium
                                                   flex items-center justify-center
                                                   cursor-move shadow-sm"
                                    >
                                        {p.name}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Timeline;
