export interface Priority {
    id: number;
    name: string;
}

export interface PrioritiesData {
    priorities: Priority[];
}

export interface PriorityComponentProps {
    id?: number;
    priorityId?: number;
    priority?: string;
    onSelectCallback: (e: any) => void;
}