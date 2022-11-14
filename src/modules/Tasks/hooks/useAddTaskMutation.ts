import { ApolloError, useMutation } from "@apollo/client";
import { useToastsMutations } from "modules/App/components/Toaster/hooks/useToastsMutation";
import { useError } from "modules/App/hooks/useError";
import { ADD_TASK } from "queries/mutation/addTask";
import { AddTaskProps } from "../types";

export function useAddTaskMutation(ref: React.MutableRefObject<AddTaskProps>) {
    const { getError } = useError();
    const { addToast } = useToastsMutations();

    const [mutateFunction, { loading }] = useMutation<AddTaskProps, AddTaskProps>(ADD_TASK);

    async function runMutation({variables}: {variables: any}): Promise<void> {
        try {
            await mutateFunction({
                variables,
                onCompleted() {
                    addToast({msg: `Dodano zadanie '${ref.current.name}'`, type: 'success'})
                }
            });  
            getError(undefined)
        } catch(e) {
            getError(e as ApolloError)
        }
    }

    async function submitTask(e: MouseEvent): Promise<void> {
        e.preventDefault();
        await runMutation({
            variables: {
                name: ref.current.name,
                description: ref.current.description,
                statusId: Number(ref.current.statusId),
                projectId: Number(ref.current.projectId),
                priorityId: Number(ref.current.priorityId)
            }
        })
    }

    return {
        submitTask,
        loading
    }
}