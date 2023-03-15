import { Observer } from "./Observer";

interface ObservableSubject<NotifiedArgument> {
    subscribe(observer: Observer<NotifiedArgument>): void;
    unsubscribe(observer: Observer<NotifiedArgument>): void;
    notify(arg: NotifiedArgument): void;
}

export class Subject<NotifiedArgument> implements ObservableSubject<NotifiedArgument> {
    private observers: Set<Observer<NotifiedArgument>>;
    
    constructor(private _observer: NotifiedArgument) {
        this.observers = new Set();
    }

    get(): NotifiedArgument {
        return this._observer
    }

    subscribe(observer: Observer<NotifiedArgument>): void {
        this.observers.add(observer);
    }
    unsubscribe(observer: Observer<NotifiedArgument>): void {
        this.observers.delete(observer);
    }
    
    notify(e: NotifiedArgument): void {
        if (this._observer !== e) {
            this._observer = e;
            this.observers.forEach(observer => {
                observer.update(e);
            })
        }
    }
}