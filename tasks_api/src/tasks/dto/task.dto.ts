import {TaskStatus} from "../task.entity";
import {IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator'

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    title: string
    @IsString()
    description: string
    @IsDate()
    @IsOptional()
    initialDate?: Date
    @IsDate()
    @IsOptional()
    endDate?: Date
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @MinLength(1)
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus

    @IsDate()
    @IsOptional()
    initialDate?: Date

    @IsDate()
    @IsOptional()
    endDate?: Date
}
