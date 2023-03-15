import styled from 'styled-components';
import { useTimeTracker } from "./useTimer";

const Button = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        i {
            color: #fac;
        }
    }
`;

interface TimerOperations {
    operations: {
        onTimerStart?: (args: any) => void;
        onTimerStop?: (args: any) => void;
        onTimerPause?: (args: any) => void;
        onTimerResume?: (args: any) => void;
    }
}

export function Timer({ operations }: TimerOperations) {
    const { time, timeInSeconds, startTimer, clear, stopTimer } = useTimeTracker();
    const { onTimerStop } = operations;

    function onStart() {
        startTimer();
    }

    function onStop() {
        stopTimer();
        onTimerStop && onTimerStop(timeInSeconds);
    }

    function onPause() {
        clear();
    }

    return (
        <div>
            <div style={{display: "flex"}}>
                <Button onClick={onStart}><i className="fas fa-solid fa-play"></i></Button>
                <Button onClick={onPause}><i className="fas fa-solid fa-pause"></i></Button>
                <Button onClick={onStop}><i className="fas fa-solid fa-stop"></i></Button>
            </div>
            <h2 style={{marginBottom: 0}}>{time}</h2>
        </div>
    )
}