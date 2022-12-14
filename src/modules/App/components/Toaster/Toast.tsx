import { useEffect, useState } from "react";
import { Transition, TransitionGroup, CSSTransition } from "react-transition-group";
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
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
    exiting: {
        opacity: 0,
    },
    exited: {
        opacity: 0,
    },
    unmounted: { opacity: 0 }
};

export function Toast({ toast, index, onTimesClick }: ToastComponentProps) {
    const { msg, type } = toast;
    const [transitionState, setTransitionState] = useState(false)

    useEffect(() => {
        let mounted = false;
        setTransitionState(true)

        return () => {
            if(mounted) {
                setTransitionState(false)
            }
            mounted = true;
        }
    }, [])

    return(
        <Transition 
            in={transitionState} 
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
        transition: `opacity ${300}ms ease-in-out`,
        borderRadius: 5,
        borderLeftWidth: 7,
        boxShadow: '1px 13px 19px -13px rgba(184, 184, 184, 1)',
        opacity: 0
    }
}