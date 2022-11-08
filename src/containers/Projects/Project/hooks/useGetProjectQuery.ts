import { useQuery } from "@apollo/client";
import { GetProjectMutationVariables, SingleProject } from "containers/Projects/types";
import { GET_PROJECT_BY_ID } from "queries/query/getProjects";
import { ChangeEvent, useEffect, useRef } from "react";
import { UpdateProps } from "../types";

export function useGetProjectQuery(id: string | undefined, ref: React.MutableRefObject<UpdateProps>) {
    const { loading, error: fetchError, data } = useQuery<SingleProject, GetProjectMutationVariables>(GET_PROJECT_BY_ID, {
        variables: {
            id: Number(id)
        },
    });

    useEffect(() => {
        if(data) {
            ref.current.name = data.project.name;
            ref.current.description = data.project.description;
            ref.current.statusId = data.project.statusId.id;
            ref.current.priorityId = data.project.priorityId.id;
        }
    }, [data, ref])

    function updateRef(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, key: keyof UpdateProps) {
        ref.current = {
            ...ref.current,
            [key]: e.target.value
        }
    }
    
    return {
        data,
        fetchError,
        loading,
        updateRef
    }
}