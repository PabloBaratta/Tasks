import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./task.entity";
import {v4} from "uuid";
import {UpdateTaskDto} from "./dto/task.dto";

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        {
            id : '12',
            title: 'Hace app de tareas',
            description: 'Necesita parámetros de calidad',
            status: TaskStatus.PENDING,
            initialDate: new Date(2024, 8, 6, 0,0),
            endDate: new Date(2024, 8, 6, 23,51)
        },
    ];


    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(title : string, description : string): Task {
        let task: Task = {
            description: description,
            endDate: null,
            id: v4(),
            initialDate: null,
            status: TaskStatus.PENDING,
            title: title
        };

        this.tasks.push(task);

        return task;
    }

    createTaskWithDate(title: string, description: string, initialDate: Date, endDate: Date): Task{
        let task: Task = {
            description: description,
            endDate: endDate,
            id: v4(),
            initialDate: initialDate,
            status: TaskStatus.PENDING,
            title: title
        };

        this.tasks.push(task);

        return task;
    }

    updateTask(id: string, updatedFields: UpdateTaskDto): Task {
        const task = this.getTaskById(id);
        const updatedTask = Object.assign(task, updatedFields);
        this.tasks = this.tasks.map(task => task.id === id ? updatedTask : task);
        return updatedTask;
    }

    deleteTask(id: string) : Task {
        const task = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id)
        return task
    }

    private getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }
}
