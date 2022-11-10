export interface ProjectInlineTask {
    name: string;
}

export interface ProjectBasicInfo {
    id: number;
    name: string;
}

export interface ProjectStatusDetails {
    id: number;
    name: string;
}

export interface ProjectPriorityDetails {
    id: number;
    name: string;
}

export interface ProjectTasksDetails {
    id: number;
    name: string;
}

export interface ProjectClientDetails {
    name: string;
}

export interface Project extends ProjectBasicInfo {
    tasks: ProjectInlineTask[];
    statusId: ProjectStatusDetails;
    priorityId: ProjectPriorityDetails;
    clientId: ProjectClientDetails;
}


export interface SingleProjectDetails extends ProjectBasicInfo {
    tasks: number;
    status: string;
    priority: string;
    client: string;
}

export interface ProjectsData {
    projects: Project[];
}

export interface ProjectClickable extends SingleProjectDetails {
    onClick: () => void;
}


export interface SingleProject {
    project: {
        id: number;
        name: string;
        tasks: ProjectTasksDetails[],
        description: string,
        statusId: ProjectStatusDetails,
        priorityId: ProjectPriorityDetails,
        clientId: ProjectClientDetails
    }
}

export interface GetProjectMutationVariables {
    id: number;
}