import {Body, Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import {TasksService} from './tasks.service'
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/task.dto";
@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {
    }
    @Get()
    getAllTasks() : Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() newTask : CreateTaskDto): Task {
        if (newTask.initialDate !== null){
            return this.tasksService.createTaskWithDate(newTask.title,
                newTask.description,
                newTask.initialDate,
                newTask.endDate);
        }
        return this.tasksService.createTask(newTask.title, newTask.description);
    }

    @Patch()
    updateTask(): Task {
        return this.tasksService.updateTask()
    }
    @Delete()
    deleteTask(): Task {
        return this.tasksService.deleteTask()
    }

}
