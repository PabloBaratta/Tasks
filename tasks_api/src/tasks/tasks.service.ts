import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./task.entity";
import {v4} from "uuid";

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

    getTask(id : string): Task {
        return new Task()
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

    updateTask(): Task {
        return new Task()
    }

    deleteTask() : Task {
        return new Task()
    }
}
