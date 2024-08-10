import React, {useEffect, useState} from 'react'
import {Task} from "../../types/tasks/task";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addTask, fetchTasks, updateTask} from "../../features/tasks/tasksSlice.ts";
import api from "../api.tsx";
import {AxiosResponse} from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {AppDispatch, RootState} from "../../app/store";

export const TaskForm = () => {

    interface FormData {
        title: string;
        description: string;
        initialDate?: Date;
        endDate?: Date;
    }

    const [task, setTask] = useState({
        title: '',
        description: '',
        endDate: '',
        initialDate: '',
    })

    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state: RootState) => state.tasks);
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        if (params.id && tasks.loaded) {
            const find = tasks.tasks.find(task => task.id === params.id);

            if (!find) {
                navigate('/');
            }
            setTask(find);
        }
    }, [tasks, params.id]);

    useEffect(() => {
        if (params.id && !tasks.loaded) {
            (dispatch as AppDispatch)(fetchTasks());
        }
    }, [params.id, tasks.loaded]);
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData();
    }

    const sendData = async () => {
        try {

            const formData: FormData = {
                title: task.title,
                description: task.description,
                initialDate: task.initialDate ? new Date(task.initialDate) : undefined,
                endDate: task.endDate ? new Date(task.endDate) : undefined,
            };

            if (params.id) {
                const promise: AxiosResponse<Task> = await api.patch(`/tasks/${params.id}`, formData);
                dispatch(updateTask(promise.data))
            } else {
                const promise: AxiosResponse<Task> = await api.post('/tasks', formData);
                dispatch(addTask(promise.data))
            }
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
            <label className="block text-sm font-bold">Tarea:</label>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={task.title}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
                placeholder="Write a title"
                autoFocus
            />
            <label>
                Descripción:
                <textarea
                    name="description"
                    onChange={handleChange}
                    value={task.description}
                    className="w-full p-2 rounded-md bg-zinc-600 mb-2"
                    placeholder="Write a description"
                />
            </label>
            <label>
                Fecha inicial:
            <input name='initialDate' type="date" onChange={handleChange} value={task.initialDate}
                   className="w-full p-1 rounded-md bg-zinc-600 mb-2"
            />
            </label>
            <label>
                Fecha Final:
            <input name='endDate' type="date" onChange={handleChange} value={task.endDate}
                   className="w-full p-1 rounded-md bg-zinc-600 mb-2"
            />
            </label>
            <button type="submit" className="bg-indigo-600 px-2 py-1">Guardar</button>
        </form>

    </div>
}