
export interface AddTimeReportMutationProps {
    duration: number;
    taskId: number;
}

export interface AddTimeReportMutationReturnProps {
    addTimeReport: AddTimeReportMutationProps;
}

export interface AddTimeReportHookProps extends Pick<AddTimeReportMutationProps, "taskId"> {}

export type AddTimeMutationFromUIVariables = Pick<AddTimeReportMutationProps, "duration">;

export interface AddTimeReportOperations {
    addTimeReport: (variables: AddTimeMutationFromUIVariables) => Promise<void>;
}