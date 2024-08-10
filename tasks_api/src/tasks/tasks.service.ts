import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./task.entity";
import {UpdateTaskDto} from "./dto/task.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TasksService {

    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

    async getAllTasks():Promise<Task[]>{
        return this.tasksRepository.find();
    }

    async createTask(title: string, description: string) : Promise<Task> {
        let task = {
            description: description,
            status: TaskStatus.PENDING,
            title: title
        };

        const createdTask: Task = this.tasksRepository.create(task);

        console.log(createdTask);
        return this.tasksRepository.save(createdTask);
    }

    async createTaskWithDate(title: string, description: string, initialDate: Date, endDate: Date) : Promise<Task> {
        let task = {
            description: description,
            endDate: endDate,
            initialDate: initialDate,
            status: TaskStatus.PENDING,
            title: title
        };

        const createdTask: Task = this.tasksRepository.create(task);
        return await this.tasksRepository.save(createdTask);
    }

    async updateTask(id: string, updatedFields: UpdateTaskDto): Promise<Task> {
        await this.tasksRepository.update({id}, updatedFields);
        return this.getTaskById(id);
    }

    deleteTask(id: string) : Promise<Task> {
        const taskById = this.getTaskById(id);
        this.tasksRepository.delete({id});
        return taskById;
    }

    getTaskById(id: string): Promise<Task> {
        return this.tasksRepository.findOne({
            where: {
                id
            }
        })
    }
}
