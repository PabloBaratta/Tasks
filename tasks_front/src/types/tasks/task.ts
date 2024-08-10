export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    initialDate?: Date
    endDate?: Date
}

export class CreateTaskDTO {
    title: string
    description: string
    initialDate?: Date
    endDate?: Date
}