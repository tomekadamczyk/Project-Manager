export interface ErrorObject {
    message: string;
    error: string;
}

export type ErrorsObjects = {
    [index: string]: ErrorObject
}