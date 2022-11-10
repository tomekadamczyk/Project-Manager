import { useQuery } from "@apollo/client";
import { GetProjectMutationVariables } from "modules/Projects/types";
import { GET_TASK_BY_ID } from "queries/query/getTasks";
import { ChangeEvent, useEffect } from "react";
import { UpdateTaskProps, SingleTask } from "../../../types";

export function useGetTaskQuery(id: string | undefined, ref: React.MutableRefObject<UpdateTaskProps>) {
    const { loading, error: fetchError, data } = useQuery<SingleTask, GetProjectMutationVariables>(GET_TASK_BY_ID, {
        variables: {
            id: Number(id)
        },
    });

    useEffect(() => {
        if(data && data.task) {
            ref.current.name = data.task.name;
            ref.current.description = data.task.description;
            ref.current.statusId = data.task.statusId.id;
            ref.current.priorityId = data.task.priorityId.id;
        }
    }, [data, ref])

    function updateRef(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, key: keyof UpdateTaskProps) {
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