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

    return  (<div>

        <header>
        <h1>Tasks</h1>
        <Link to={'/create-task'}>
            Crear
        </Link>
        </header>

        {tasks.tasks.map((task: Task) => {
            return (<div key={task.id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
            <Link to={`edit-task/${task.id}`}> Editar </Link>`
            </div>)
            }
        )}
    </div>)
}