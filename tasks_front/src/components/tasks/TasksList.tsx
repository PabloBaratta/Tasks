import React, {useEffect} from 'react'
import {AxiosResponse} from "axios";
import {Task, TaskStatus} from "../../types/tasks/task.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import api from "../api.tsx";
import {deleteTask, fetchTasks, updateTask} from "../../features/tasks/tasksSlice.ts";
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

    const handleStateUpdate = async (task:Task, state: TaskStatus, id: String) => {
        try {
            let prop = {status : state}
            let promise:AxiosResponse<Task> = await api.patch('/tasks/' + id, prop);
            dispatch(updateTask(promise.data))
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    }



    return  (<div className='w-3/6'>

        <header className="flex justify-between items-center py-4">
        <h1>Tareas</h1>
        <Link className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' to={'/create-task'}>
            Crear
        </Link>
        </header>

        <div className="grid grid-cols-3 gap-4">
            {tasks.tasks && [...tasks.tasks].sort((a, b) => new Date(a.initialDate).getTime() - new Date(b.initialDate).getTime())
                .map((task: Task) => (
                <div className="bg-neutral-800 p-4 rounded-md" key={task.id}>
                    <header className="flex justify-between">
                        <h3 className="text-lg font-bold">{task.title}</h3>
                        <div className="flex gap-x-2">
                            <Link
                                to={`/edit-task/${task.id}`}
                                className="bg-zinc-600 px-2 py-1 text-xs rounded-md self-center"
                            >
                                Editar
                            </Link>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 px-2 py-1 text-xs rounded-md"
                            >
                                Eliminar
                            </button>
                        </div>
                    </header>
                    <p>{task.description}</p>
                    {task.initialDate && task.endDate &&
                    <div className="text-sm text-slate-300 mb-2">
                        <p><strong>Inicio:</strong> {new Date(task.initialDate).toLocaleDateString()}</p>
                        <p><strong>Final:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
                    </div>}
                    <p className="text-xs text-slate-400">{task.id}</p>
                    <Status
                        status={task.status}
                        onChange={(state: TaskStatus) => handleStateUpdate(task, state, task.id)}
                    />
                </div>
            ))}
        </div>
    </div>)
}

const Status = ({status, onChange}) => {

    let statuses: TaskStatus[] = [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
    const getStatusColor = (status) => {
        switch (status) {
            case TaskStatus.PENDING:
                return 'bg-yellow-800';
            case TaskStatus.IN_PROGRESS:
                return 'bg-blue-800';
            case TaskStatus.DONE:
                return 'bg-green-800';
            default:
                return '';
        }
    };

    return (
        <div className="flex gap-2 py-3">
            {statuses.map((state:TaskStatus) => (
                <button
                    key={state}
                    className={`px-2 py-1 text-xs rounded-md cursor-pointer ${
                        getStatusColor(state)
                    } ${status === state ? 'font-bold border border-white' : ''}`}
                    onClick={() => onChange(state)}
                >
                    {state}
                </button>
            ))}
        </div>
    );
};