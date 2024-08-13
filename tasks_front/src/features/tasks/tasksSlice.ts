import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../types/tasks/task";
import api from "../../components/api.tsx";

interface TaskState {
    loading: boolean,
    tasks: Task[],
    error: string,
    loaded: boolean
}

const initialState : TaskState = {
    loading: false,
    tasks: [],
    error: '',
    loaded: false
};

export const fetchTasks = createAsyncThunk("fetchTasks", async (thunkAPI) => {
    try {
        const res = await api.get('/tasks');
        return res?.data;
    }
    catch (error) {
        thunkAPI.rejectWithValue(error)
        return error;
    }
});

export const tasksSlice = createSlice({
        name : 'tasks',
        initialState : initialState,
        reducers : {
            addTask : (state, task: PayloadAction<Task>) => {
                state.tasks.push(task.payload);
            },
            deleteTask : (state, task: PayloadAction<Task>) => {
                state.tasks = state.tasks.filter((item) => item.id !== task.payload.id);

            },
            updateTask : (state, task: PayloadAction<Task>) => {
                const taskToUpdate: Task = state.tasks.find((item) => item.id === task.payload.id);
                const updatedTask:Task = Object.assign(taskToUpdate, task.payload);
                state.tasks.map((item) => item.id === task.payload.id ? item : updatedTask);
            }
        },
        extraReducers : (builder) => {
            builder.addCase(fetchTasks.pending, (state:TaskState, action) => {
                state.loading = true;
            })
            builder.addCase(fetchTasks.fulfilled, (state: TaskState, action: ReturnType<Task[]>) => {
                state.loading = false;
                state.loaded = true;
                state.tasks = action.payload;
            })
            builder.addCase(fetchTasks.rejected, (state:TaskState, action) => {
                state.error = action.payload;
            })
        }
    });



export const {addTask,
    deleteTask,
    updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;