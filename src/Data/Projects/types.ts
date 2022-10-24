export interface Project {
    id: number;
    name: string;
}

export interface ProjectsData {
    projects: Project[];
}

export interface ProjectComponentProps {
    id?: number;
    projectId?: number;
    project?: string;
    onSelectCallback: (e: any) => void;
}