export interface ToastProps {
    timestamp: number;
    id: number;
    msg: string;
    type: Status;
}

export interface AddToastProps {
    msg: string;
    type: Status;
}

interface ToasterOperations {
    removeLastToast: () => void;
    addToast: (toast: AddToastProps) => void;
}

export interface ToasterTimerProps {
    toasts: ToastProps[];
    operations: Pick<ToasterOperations, 'removeLastToast'>;
    timeout?: number;
}

export interface ToastComponentProps {
    toast: ToastProps;
    index: number;
    onTimesClick: (id: number) => void;
}

export type Status = 'success' | 'warning' | 'error';
export type MappedToStatus = { [Property in Status]: string}

export interface UseGetToastsReturnValue {
    toasts: ToastProps[];
    operations: ToasterOperations;
}