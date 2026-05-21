import { createContext, useContext, useReducer, useEffect } from "react";
import { tasks as initialTasks } from "../data/tasks";
import { projects as initialProjects } from "../data/projects";
import { activities as initialActivities } from "../data/activity";

const AppContext = createContext();

const storedState = JSON.parse(localStorage.getItem("pm-state"));

const initialState = {
    user: storedState?.user || { name: "Varun", email: "" },

    projects: (storedState?.projects || initialProjects).map((p) => ({
        ...p,
        members: Array.isArray(p.members) ? p.members : [],
    })),

    tasks: Array.isArray(storedState?.tasks)
        ? storedState.tasks
        : initialTasks.map((t) => ({
            ...t,
            id: Date.now() + Math.random(),
            projectId: initialProjects[0]?.id,
        })),

    activities: storedState?.activities || initialActivities,

    notifications: [],

    members: Array.isArray(storedState?.members)
        ? storedState.members
        : [{ id: 1, name: "Varun", email: "varun@deadlineslayer.com" }],

    darkMode: storedState?.darkMode ?? true,
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [
                    ...state.projects,
                    { id: Date.now(), members: [], ...action.payload },
                ],
            };

        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, { id: Date.now(), ...action.payload }],
                notifications: [
                    ...state.notifications,
                    {
                        id: Date.now(),
                        message: `Task "${action.payload.title}" added`,
                        type: "success",
                    },
                ],
            };

        case "ADD_MEMBER":
            return {
                ...state,
                members: [...state.members, action.payload],
            };

        case "ADD_MEMBER_TO_PROJECT":
            return {
                ...state,
                projects: state.projects.map((p) =>
                    p.id === action.payload.projectId
                        ? {
                            ...p,
                            members: [...p.members, action.payload.memberId],
                        }
                        : p
                ),
            };

        case "REMOVE_NOTIFICATION":
            return {
                ...state,
                notifications: state.notifications.filter(
                    (n) => n.id !== action.payload
                ),
            };

        case "TOGGLE_DARK_MODE":
            return {
                ...state,
                darkMode: !state.darkMode,
            };

        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem("pm-state", JSON.stringify(state));
        document.documentElement.classList.toggle("dark", state.darkMode);
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
