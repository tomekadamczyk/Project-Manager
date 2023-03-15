import { TaskEntity, TaskEntityDTO } from "../Entity/Task.entity";
import { useToastsMutations } from "modules/App/components/Toaster/hooks/useToastsMutation";
import { TaskName } from "../Entity/TaskName.valueobject";
import { TaskMap } from "../Mappers/Task.mapper";
import { AddTaskProps } from "../types";
import { ApolloCache, DefaultContext, DocumentNode, MutationFunctionOptions, MutationHookOptions, MutationTuple, TypedDocumentNode } from "@apollo/client";
import { ADD_TASK } from "queries/mutation/addTask";
import { FetchResult } from "react-apollo";

export abstract class UseCase<IRequest, IResponse> {
    protected abstract execute (request: IRequest) : Promise<IResponse> | IResponse;

    static async run(request: TaskEntityDTO | undefined) {
        return await this.prototype.execute(request)
    }
}

export class CreateTaskUseCase extends UseCase<TaskEntityDTO, TaskEntityDTO> {

    execute(request: TaskEntityDTO | undefined) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { addToast } = useToastsMutations();
        const name = TaskName.create(request!.name);
        if(name.state === 'error') {
            addToast({msg: name.error as string, type: 'error'})
        } else {
            const taskName = name.getValue();
            if(taskName && taskName instanceof TaskName) {
                const task = TaskEntity.create({
                    name: taskName,
                    description: request!.description,
                    statusId: request!.statusId,
                    priorityId: request!.priorityId,
                    projectId: request!.projectId
                })
                return TaskMap.toDTO(task.getValue()!)
            }
        }
    }
}


