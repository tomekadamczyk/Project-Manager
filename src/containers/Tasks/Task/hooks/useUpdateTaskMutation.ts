import { ApolloError, useMutation } from "@apollo/client";
import { useError } from "hooks/useError";
import { UPDATE_FULL_TASK } from "queries/mutation/updateTask";
import { GET_TASK_BY_ID } from "queries/query/getTasks";
import { UpdateTaskProps } from "../../types";

export function useUpdateTaskMutation(id: string|undefined, ref: React.MutableRefObject<UpdateTaskProps>) {
    const {error, getError} = useError();

    const [mutateFunction, { loading: updateLoading }] = useMutation(UPDATE_FULL_TASK);

    async function runMutation({variables}: {variables: any}): Promise<void> {
        if(id) {
            try {
                await mutateFunction({
                    variables,
                    refetchQueries: [
                        { query: GET_TASK_BY_ID, variables: { id: Number(id) } }
                    ],
                })
                
                getError(undefined)
            } catch(e) {
                getError(e as ApolloError)
            }
        }
    }

    async function updateTask(): Promise<void> {
        await runMutation({
            variables: {
                id: Number(id),
                name: ref.current.name,
                description: ref.current.description,
                statusId: Number(ref.current.statusId),
                priorityId: Number(ref.current.priorityId)
            }
        })
    }

    return {
        updateTask,
        updateLoading
    }
}