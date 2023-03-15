import { createObservable } from "modules/App/hooks/Observable/useCreateObservable";
import { EstimatorObserver } from "modules/Tasks/Observables/EstimatorObserver";
import { estimatorService } from "modules/Tasks/Observables/EstimatorSubject";
import { ChangeEvent } from "react";

function onEstimationChanged(e: ChangeEvent<HTMLInputElement>) {
    estimatorService.addEstimation(Number(e.target.value))
}

export function createTaskEstimationObserverHook() {
    let initial = 0;
    const observer = new EstimatorObserver(initial);
    
    return function() {
        const observeFromEstimation = createObservable(estimatorService.getOne(), observer!);
        const estimation = observeFromEstimation();
    
        return { estimation, observer, onEstimationChanged }
    } 
}
