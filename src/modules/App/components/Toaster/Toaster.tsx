import { useGetToasts } from './hooks/useGetToasts';
import { useToasterTimer } from './hooks/useToasterTimer';
import { useToastsMutations } from './hooks/useToastsMutation';
import { Toast } from './Toast';
import { ToasterTimerProps } from './types';

export function Toaster({ timeout }: Partial<ToasterTimerProps>) {

    const toasts = useGetToasts();
    const { removeLastToast, removeToast } = useToastsMutations();

    const operations = {
        removeLastToast
    }
    
    useToasterTimer({ toasts, operations, timeout });

    return(
        <div style={{
            zIndex: 999,
            position: 'absolute',
            right: 50,
            top: 20,
            width: '25%'
        }}>
            {toasts.map((toast, index) => {
                return (
                    <Toast key={toast.timestamp} toast={toast} index={index} onTimesClick={removeToast} />
                )
            })}
        </div>
    )
}