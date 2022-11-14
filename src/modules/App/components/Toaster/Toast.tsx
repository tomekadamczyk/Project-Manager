import { useEffect, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { CloseButton } from "../Button/CloseButton";
import { MappedToStatus, ToastComponentProps } from "./types";


export const Colors: MappedToStatus = {
    success: '#03ae35',
    warning: '#eb9e34',
    error: '#ff0f0f',
}

const StatusLabel: MappedToStatus = {
    success: 'Sukces',
    warning: 'Ostrzeżenie',
    error: 'Bład'
}

const transitions = {
    entering: {
        display: 'block'
    },
    entered: {
        opacity: 1,
        display: 'block'
    },
    exiting: {
        opacity: 0,
        display: 'block'
    },
    exited: {
        opacity: '0',
        display: 'none'
    },
    unmounted: undefined
};

export function Toast({ toast, index, onTimesClick }: ToastComponentProps) {
    const { msg, type } = toast;
    const [transitionState, setTransitionState] = useState(false)
    

    useEffect(() => {
        setTransitionState(!transitionState)
    }, [])

    return(
        <Transition 
            in={transitionState} 
            out={!transitionState} 
            timeout={index * 300}
        >
            {state => (
                <div style={{...styles.toast, borderLeftColor: Colors[type], ...transitions[state], position: 'relative'}}>
                    <div style={{position: 'absolute', right: 10, top: 10}}>
                        <CloseButton onClick={() => onTimesClick(toast.id)} />
                    </div>
                    <div style={{...styles.label, color: Colors[type]}}>{StatusLabel[type]}</div>
                    <div>{msg}</div>
                </div>
            )}
        </Transition>
        )
}

const styles = {
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 7,
        letterSpacing: .7
    },
    toast: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
        background: 'white',
        transition: 'all 1s',
        borderRadius: 5,
        borderLeftWidth: 7,
        boxShadow: '1px 13px 19px -13px rgba(184, 184, 184, 1)',
        opacity: 0,
        display: 'none'
    }
}