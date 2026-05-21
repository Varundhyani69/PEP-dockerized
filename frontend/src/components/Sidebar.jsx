import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    FolderIcon,
    ClipboardDocumentListIcon,
    Squares2X2Icon,
    CalendarIcon,
    CogIcon
} from '@heroicons/react/24/outline';

const links = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Projects", path: "/projects", icon: FolderIcon },
    { name: "Tasks", path: "/tasks", icon: ClipboardDocumentListIcon },
    { name: "Board", path: "/board", icon: Squares2X2Icon },
    { name: "Timeline", path: "/timeline", icon: CalendarIcon },
    { name: "Settings", path: "/settings", icon: CogIcon },
];

function Sidebar() {
    return (
        <aside className="w-64 h-full bg-linear-to-b from-[#0f172a] to-[#020617] text-white flex flex-col">

            <div className="p-6 text-lg font-semibold">
                D. <span className="text-var(--accent)">Slayer</span>
            </div>

            <nav className="flex-1 px-3 space-y-1 py-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 rounded-lg text-sm transition-colors space-x-3 ${isActive
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-white/60 hover:bg-white/5"

                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;