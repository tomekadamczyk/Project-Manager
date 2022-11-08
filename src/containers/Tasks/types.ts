
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
    projectsId: TaskProjectDetails
}

export interface TasksData {
    tasks: Task[];
}

export interface SingleTaskRowDetails extends TaskBasicInfo {
    status: string;
    priority: string;
    project: string;
}