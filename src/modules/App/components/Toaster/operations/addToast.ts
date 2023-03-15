import { ReactiveVar } from '@apollo/client';
import { AddToastProps, ToastProps } from '../types';

function generateNewToastId(allToasts: ToastProps[]) {
    if(allToasts[0]) {
        return allToasts[0].id + 1
    }
    return 0
}

export function addToast(toastsVar: ReactiveVar<ToastProps[]>) {

    return function (toast: AddToastProps) {
        const allToasts = toastsVar();
        
        const newToast: ToastProps = {
            ...toast,
            id: generateNewToastId(allToasts),
            timestamp: new Date().getTime()
        }
        
        toastsVar([newToast, ...allToasts]);
    }
}