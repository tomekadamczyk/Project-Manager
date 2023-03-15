
interface Listenable<NotifiedArgument> {
    update(arg: NotifiedArgument): void;
    onNotify?(arg: any): void;
    setDispatcher(stateDispatcher: (arg: NotifiedArgument) => void): void;
}

export class Observer<NotifiedArgument> implements Listenable<NotifiedArgument> {
    protected stateDispatcher: (arg: NotifiedArgument) => void = () => {};

    setDispatcher(stateDispatcher: (arg: NotifiedArgument) => void) {
        this.stateDispatcher = stateDispatcher;
    }

    update(e: NotifiedArgument): void {
        console.log(`Observer is updating with ${e} `);
    }

    onNotify(e: any) {
        e()
    }
}