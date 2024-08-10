import {TaskStatus} from "../task.entity";
import {IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator'

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    title: string
    @IsString()
    description: string
    @IsDateString()
    @IsOptional()
    initialDate?: Date
    @IsDateString()
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

    @IsDateString()
    @IsOptional()
    initialDate?: Date

    @IsDateString()
    @IsOptional()
    endDate?: Date
}
