import { useRef, useState } from "react";
import { formatTime } from "../../../../utils/formatTime";

export function useTimeTracker() {
    const [time, setTime] = useState(0);
    const timer = useRef<NodeJS.Timer>();

    function startTimer() {
        clearInterval(timer.current)
        timer.current = setInterval(() => {
            setTime(time => time + 1)
        }, 1000)
    }

    function stopTimer() {
        clearInterval(timer.current)
        setTime(0)
    }

    function clear() {
        clearInterval(timer.current)
    }

    return {
        time: formatTime(time),
        timeInSeconds: time,
        startTimer,
        stopTimer,
        clear
    }
}