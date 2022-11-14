import { ApolloError, useMutation } from "@apollo/client";
import { useToastsMutations } from "modules/App/components/Toaster/hooks/useToastsMutation";
import { useError } from "modules/App/hooks/useError";
import { UPDATE_FULL_TASK } from "queries/mutation/updateTask";
import { GET_TASK_BY_ID } from "queries/query/getTasks";
import { UpdateTaskProps } from "../types";

export function useUpdateTaskMutation(id: string|undefined, ref: React.MutableRefObject<UpdateTaskProps>) {
    const { getError } = useError();
    const { addToast } = useToastsMutations();

    const [mutateFunction, { loading: updateLoading }] = useMutation(UPDATE_FULL_TASK);

    async function runMutation({variables, onCompletedMessage}: {variables: any, onCompletedMessage: string}): Promise<void> {
        if(id) {
            try {
                await mutateFunction({
                    variables,
                    refetchQueries: [
                        { query: GET_TASK_BY_ID, variables: { id: Number(id) } }
                    ],
                    onCompleted() {
                        addToast({msg: onCompletedMessage, type: 'success'})
                    }
                })
                
                getError(undefined)
            } catch(e) {
                getError(e as ApolloError)
            }
        }
    }

    async function updateTask({ onCompletedMessage }: {onCompletedMessage: string}): Promise<void> {
        await runMutation({
            variables: {
                id: Number(id),
                name: ref.current.name,
                description: ref.current.description,
                statusId: Number(ref.current.statusId),
                priorityId: Number(ref.current.priorityId)
            },
            onCompletedMessage
        })
    }

    return {
        updateTask,
        updateLoading
    }
}