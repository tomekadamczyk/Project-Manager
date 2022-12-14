import { TaskEntity } from "../Entity/Task.entity";

export class TaskMap {

    public static toDomain (raw: any): TaskEntity | null {
        const taskOrError = TaskEntity.create({
            name: raw.name,
            description: raw.description,
            statusId: Number(raw.statusId),
            projectId: Number(raw.projectId),
            priorityId: Number(raw.priorityId)
        });
        return taskOrError.state === 'success' ? taskOrError.getValue()! : null;
    }


    public static toDTO (task: TaskEntity): any {
        
        return {
            name: task.name.props.value,
            description: task.description,
            statusId: Number(task.statusId),
            projectId: Number(task.projectId),
            priorityId: Number(task.priorityId)
        }
    }
}