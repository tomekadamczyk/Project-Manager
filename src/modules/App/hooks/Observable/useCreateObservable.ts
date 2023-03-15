import { Observer } from "core/infra/Observable/Observer";
import { Subject } from "core/infra/Observable/Subject";
import { useEffect, useState } from "react";

export function createObservable<T>(
    subject: Subject<T>, 
    observer: Observer<T>
) {
    
    return function(): T {
        const [value, setValue] = useState<T>(subject.get());
    
        useEffect(() => {
            observer.setDispatcher(setValue);
            subject.subscribe(observer);

            return () => subject.unsubscribe(observer)
        }, [])
    
        return value;
    }
}