import { ApolloError, useMutation } from "@apollo/client";
import { useError } from "hooks/useError";
import { UPDATE_PROJECT } from "queries/mutation/updateProject";
import { GET_PROJECT_BY_ID } from "queries/query/getProjects";
import { UpdateProps } from "../types";

export function useUpdateProjectMutation(id: string|undefined, ref: React.MutableRefObject<UpdateProps>) {
    const {error, getError} = useError();

    const [mutateFunction, { loading: updateLoading }] = useMutation(UPDATE_PROJECT);

    async function runMutation({variables}: {variables: any}) {
        if(id) {
            try {
                await mutateFunction({
                    variables,
                    refetchQueries: [
                        { query: GET_PROJECT_BY_ID, variables: { id: Number(id) } }
                    ],
                    awaitRefetchQueries: true,
                })
                
                getError(undefined)
            } catch(e) {
                getError(e as ApolloError)
            }
        }
    }

    async function updateProject() {
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
        updateProject,
        updateLoading
    }
}