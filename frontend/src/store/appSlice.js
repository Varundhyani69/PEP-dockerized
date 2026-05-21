import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { name: "Varun", email: "" },

    projects: [],
    tasks: [],

    members: [],
    activities: [],
    notifications: [],

    darkMode: true,
};

const getId = (item) => item._id || item.id;

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {


        setProjects(state, action) {
            state.projects = action.payload.map((p) => ({
                ...p,
                members: p.members ?? [],
            }));
        },

        setTasks(state, action) {
            state.tasks = action.payload;
        },



        addProject(state, action) {
            state.projects.push(action.payload);
        },

        addTask(state, action) {
            state.tasks.push(action.payload);

            state.notifications.push({
                id: Date.now(),
                message: `Task "${action.payload.title}" added`,
                type: "success",
            });
        },

        updateTask(state, action) {
            const idx = state.tasks.findIndex(
                (t) => getId(t) === getId(action.payload)
            );
            if (idx !== -1) {
                state.tasks[idx] = action.payload;
            }
        },

        removeTask(state, action) {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(
                (t) => getId(t) !== taskId
            );
        },

        removeProject(state, action) {
            const projectId = action.payload;

            state.projects = state.projects.filter(
                (p) => getId(p) !== projectId
            );

            state.tasks = state.tasks.filter(
                (t) => t.projectId !== projectId
            );
        },


        addMember(state, action) {
            state.members.push({
                id: action.payload.id,
                email: action.payload.email,
            });
        },

        addMemberToProject(state, action) {
            const project = state.projects.find(
                (p) => getId(p) === action.payload.projectId
            );
            if (project) {
                project.members.push(action.payload.memberId);
            }
        },



        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
        },

        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
        },

        removeNotification(state, action) {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
        },

        moveTask(state, action) {
            const { id, status } = action.payload;
            const task = state.tasks.find(
                (t) => getId(t) === id
            );
            if (task) {
                task.status = status;
            }
        },
    },
});

export const {
    setProjects,
    setTasks,
    addProject,
    addTask,
    updateTask,
    removeTask,
    removeProject,
    addMember,
    addMemberToProject,
    toggleDarkMode,
    removeNotification,
    updateUser,
    moveTask,
} = appSlice.actions;

export default appSlice.reducer;