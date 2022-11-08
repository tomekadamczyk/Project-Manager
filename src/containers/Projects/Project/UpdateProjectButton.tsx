import { ApolloError, useMutation } from "@apollo/client";
import Button from "components/UI/Button/Button";
import { useError } from "hooks/useError";
import { UPDATE_PROJECT } from "queries/mutation/updateProject";
import { GET_PROJECT_BY_ID } from "queries/query/getProjects";
import { ChangeEvent, useRef } from "react";

function useUpdateProjectMutation(id: any) {
    const {error, getError} = useError();

    const [mutateFunction, { loading: updateLoading }] = useMutation(UPDATE_PROJECT);

    async function runMutation({variables}: {variables: any}) {
        try {
            await mutateFunction({
                variables,
                refetchQueries: [
                    { query: GET_PROJECT_BY_ID, variables: { id: Number(id) } }
                ]
            })
            
            getError(undefined)
        } catch(e) {
            getError(e as ApolloError)
        }
    }

    return {
        runMutation,
        updateLoading
    }
}

interface Variablable {
    id: number;
    name: string;
    description: string;
    statusId: number;
    priorityId: number;
}

export function UpdateProjectButton({ id, variables }: { id: string, variables: Variablable }) {
    const { runMutation, updateLoading } = useUpdateProjectMutation(id);

    return (
        <Button role="submit" click={() => runMutation({ variables })}>Wyślij</Button>
    )
}