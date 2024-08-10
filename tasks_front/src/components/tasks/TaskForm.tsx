import React, {useEffect, useState} from 'react'
import {CreateTaskDTO, Task} from "../../types/tasks/task";
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
            [e.target.name] : e.target.value,
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

            if (params.id){
                const promise : AxiosResponse<Task> = await api.patch(`/tasks/${params.id}`, formData);
                dispatch(updateTask(promise.data))
            }
            else {
                const promise : AxiosResponse<Task> = await api.post('/tasks', formData);
                dispatch(addTask(promise.data))
            }
            navigate('/')
        }
        catch (error){
            console.log(error)
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input name='title' type="text" placeholder="titulo" onChange={handleChange} value={task.title} required/>
            <textarea name='description' placeholder="descripción" onChange={handleChange} value={task.description}/>
            <input name='initialDate' type="date" onChange={handleChange} value={task.initialDate}/>
            <input name='endDate' type="date"  onChange={handleChange} value={task.endDate}/>
            <button>Guardar</button>
        </form>
    </div>
}