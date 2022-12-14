import { Entity } from "core/domain/Entity";
import { Result } from "core/logic/Result";
import { TaskName } from "./TaskName.valueobject";

interface TaskProps {
    name: TaskName;
    description: string;
    statusId: number;
    priorityId: number;
    projectId: number;
}

export interface TaskEntityDTO {
    name: string;
    description: string;
    statusId: number;
    priorityId: number;
    projectId: number;
}

export class TaskEntity extends Entity<TaskProps> {

    private constructor(props: TaskProps, id: any) {
        super(props)
    }

    get name() {
        return this.props.name
    }

    get description() {
        return this.props.description
    }

    get statusId() {
        return this.props.statusId
    }

    get priorityId() {
        return this.props.priorityId
    }

    get projectId() {
        return this.props.projectId
    }

    public static create(props: TaskProps): Result<TaskEntity> {
        const task = new TaskEntity({...props}, 1)
        return Result.ok<TaskEntity>(task);
    }
}