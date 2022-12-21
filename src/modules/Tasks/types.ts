
export interface TaskBasicInfo {
    id: number;
    name: string;
}

export interface TaskPriorityDetails {
    id: number;
    name: string;
}

export interface TaskStatusDetails {
    id: number;
    name: string;
}

export interface TaskProjectDetails {
    name: string;
}

export interface Task extends TaskBasicInfo {
    statusId: TaskStatusDetails;
    priorityId: TaskPriorityDetails;
    projectId: TaskProjectDetails
}

export interface TasksData {
    tasks: Task[];
}

export interface TasksPaginated {
    totalCount: number;
    edges: Task[];
}

export interface PaginatedTasksData {
    tasksPaginated: TasksPaginated;
}

export interface SingleTaskRowDetails extends TaskBasicInfo {
    status: string;
    priority: string;
    project: string;
}

export interface SingleTask {
    task: {
        id: number;
        name: string;
        description: string,
        statusId: TaskStatusDetails,
        priorityId: TaskPriorityDetails,
        projectId: TaskProjectDetails
    }
}

export interface GetTaskVariables {
    id: number;
}

export interface UpdateTaskProps {
    name: string;
    description: string;
    statusId: number;
    priorityId: number;
}

export interface AddTaskProps {
    name: string;
    description: string;
    statusId: number;
    projectId: number;
    priorityId: number;
}

export class TaskClass {

    constructor(
        private readonly id: number,
        private name: string,
        private description: string,
        private statusId: TaskStatusDetails,
        private priorityId: TaskPriorityDetails,
        private projectId: TaskProjectDetails
    ) {
        
    }

    get properties(): SingleTask {
        return {
            task: {
                id: this.id,
                name: this.name,
                description: this.description,
                statusId: this.statusId,
                priorityId: this.priorityId,
                projectId: this.projectId
            }
        }
    }

    set status(newStatusId: number) {
        this.statusId.id = newStatusId
    }

    changeStatus(newStatusId: number) {
        this.status = newStatusId;
    }
}