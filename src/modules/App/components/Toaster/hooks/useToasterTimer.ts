import { useEffect } from 'react';
import { ToasterTimerProps } from '../types';

export function useToasterTimer({ toasts, operations, timeout = 3000 }: ToasterTimerProps) {
    const { removeLastToast } = operations;
    let toastsTimeout: any = undefined;

    function updateToasts() {
        toastsTimeout = setTimeout(function() {
            removeLastToast()
        }, timeout)
    }
    
    useEffect(() => {
        
        updateToasts()
        
        if(toasts.length === 0) {
            clearTimeout(toastsTimeout)
        }

        return () => {
            clearTimeout(toastsTimeout)
        }
    }, [toasts.length])
}