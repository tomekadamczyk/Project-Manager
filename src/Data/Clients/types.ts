import React, { ForwardedRef } from "react";

export interface Client {
    id: number;
    name: string;
}

export interface ClientsData {
    clients: Client[];
}

export interface ClientComponentProps {
    id?: number;
    clientId?: number;
    client?: string;
    onSelectCallback: (e: any) => void;
    ref: ForwardedRef<unknown>;
}