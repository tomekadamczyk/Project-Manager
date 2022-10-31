import { ForwardedRef } from "react";

export interface Status {
    id: number;
    name: string;
}

export interface StatusesData {
    statuses: Status[];
}

export interface StatusesVariables {
    id: number | undefined;
}

export interface StatusComponentProps {
    id?: number;
    statusId?: number;
    status?: string;
    onSelectCallback: (e: any) => void;
    ref: ForwardedRef<unknown>;
}