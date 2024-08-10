import React, {useEffect} from 'react'
import {AxiosResponse} from "axios";
import {Task} from "../../types/tasks/task";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import api from "../api.tsx";
import {addTask, deleteTask, fetchTasks} from "../../features/tasks/tasksSlice.ts";
import {Link} from "react-router-dom";
import {AppDispatch, RootState} from "../../app/store";
export const TasksList = () => {

    const tasks = useAppSelector((state: RootState) => state.tasks);
    const dispatch = useAppDispatch();


    useEffect(() => {
        (dispatch as AppDispatch)(fetchTasks());
    }, []);

    const handleDelete = async (id: string) => {
        try {
            let promise:AxiosResponse<Task> = await api.delete('/tasks/' + id);
            dispatch(deleteTask(promise.data))

        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    }

    return  (<div className='w-3/6'>

        <header className="flex justify-between items-center py-4">
        <h1>Tasks</h1>
        <Link className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' to={'/create-task'}>
            Crear
        </Link>
        </header>

        <div className="grid grid-cols-3 gap-4">
            {tasks.tasks.map((task) => (
                <div className="bg-neutral-800 p-4 rounded-md" key={task.id}>
                    <header className="flex justify-between">
                        <h3 className="text-lg font-bold">{task.title}</h3>
                        <div className="flex gap-x-2">
                            <Link
                                to={`/edit-task/${task.id}`}
                                className="bg-zinc-600 px-2 py-1 text-xs rounded-md self-center"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 px-2 py-1 text-xs rounded-md"
                            >
                                delete
                            </button>
                        </div>
                    </header>
                    <p>{task.description}</p>
                    <p className="text-xs text-slate-400">{task.id}</p>
                </div>
            ))}
        </div>
    </div>)
}