import { ReactiveVar } from "@apollo/client";
import { ToastProps } from "../types";

export function deleteToast(toastsVar: ReactiveVar<ToastProps[]>) {

    function removeLastToast() {
        const allToasts = toastsVar();
        const filteredToasts = allToasts.filter((toast, index) => index !== allToasts.length - 1)
        toastsVar(filteredToasts);
    }

    function removeToast(id: number) {
        const allToasts = toastsVar();
        
        toastsVar(allToasts.filter(toast => toast.id !== id));
    }

    return {
        removeLastToast,
        removeToast
    }
}