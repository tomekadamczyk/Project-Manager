import { createTaskEstimationObserverHook } from "modules/Tasks/hooks/useTaskEstimationObserver";

const useEstimator = createTaskEstimationObserverHook();
const useEstimatorReceiver = createTaskEstimationObserverHook();

export function Estimator() {
    const { estimation, onEstimationChanged } = useEstimator();

    return (
        <div>
            <h4>Estymacja</h4>
            <input type="text" value={estimation} onInput={onEstimationChanged}/>
        </div>
    )
}

export function EstimatorReceiver() {
    const { estimation } = useEstimatorReceiver();

    return (
        <div>
            <h4>{estimation}</h4>
        </div>
    )
}
