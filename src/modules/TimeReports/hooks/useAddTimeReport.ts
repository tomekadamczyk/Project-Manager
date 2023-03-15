import { ApolloError, useMutation } from "@apollo/client";
import { MutationReturnValues } from "modules/App/types/MutationReturnValues";
import { ADD_TIME_REPORT } from "queries/mutation/addTaskReport";
import { useError } from "modules/App/hooks/useError";
import { AddTimeMutationFromUIVariables, AddTimeReportHookProps, AddTimeReportMutationProps, AddTimeReportMutationReturnProps, AddTimeReportOperations } from "../types";
import { nanoid } from 'nanoid'

export function useAddTimeReport({taskId}: AddTimeReportHookProps): MutationReturnValues<AddTimeReportOperations> {

    const { getError } = useError();
    const [runMutation, { loading, error }] = useMutation<AddTimeReportMutationReturnProps, AddTimeReportMutationProps>(ADD_TIME_REPORT);

    async function addTimeReport(variables: AddTimeMutationFromUIVariables): Promise<void> {
        const { duration } = variables;
        try {
            await runMutation({ 
                variables: {
                    duration,
                    taskId
                },
                update(cache, { data: runMutation }) {
                    cache.modify({
                        fields: {
                            timeReportsByTask(existingReports = []) {
                                cache.writeQuery({
                                    query: ADD_TIME_REPORT, 
                                    data: runMutation,
                                    variables: {
                                        taskId,
                                    }
                                })
                                
                                return [
                                    {
                                        ...runMutation?.addTimeReport,
                                        uniqueId: nanoid()
                                    },
                                    ...existingReports
                                ];
                            }
                        }
                    })
                }
            })
            
            getError(undefined)
        } catch(e) {
            getError(e as ApolloError)
        }
    }

    const operations = { addTimeReport };
    const state = { loading, error }

    return { operations, state };
}