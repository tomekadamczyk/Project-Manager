import { ApolloError, useMutation } from "@apollo/client";
import { useError } from "modules/App/hooks/useError";
import { ADD_TASK } from "queries/mutation/addTask";
import { TaskEntityDTO } from "../Entity/Task.entity";
import { AddTaskProps } from "../types";
import { CreateTaskUseCase } from "../useCase/CreateTaskUseCase";

export function useAddTaskMutation(ref: React.MutableRefObject<AddTaskProps>) {
    const controller = new AbortController();
    const { getError } = useError();
    const [mutateFunction, { loading, reset }] = useMutation<AddTaskProps, AddTaskProps>(ADD_TASK);

    async function runMutation({variables}: {variables: any}): Promise<void> {
        try {
            await mutateFunction({
                variables,
                notifyOnNetworkStatusChange: true,
                context: {
                    fetchOptions: {
                        signal: controller.signal
                    },
                },
            });  
            getError(undefined)
        } catch(e) {
            getError(e as ApolloError)
        }
    }

    async function submitTask(e: MouseEvent): Promise<void> {
        e.preventDefault();
        const created = await CreateTaskUseCase.run(ref.current) as TaskEntityDTO;
        
        await runMutation({
            variables: {...created}
        })

        if(controller.signal.aborted) {
            reset()
        }
    }

    function abort() {
        controller.abort()
    }

    return {
        submitTask,
        abort,
        loading
    }
}