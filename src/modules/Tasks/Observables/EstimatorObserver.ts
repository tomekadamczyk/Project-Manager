import { Observer } from "core/infra/Observable/Observer";

export class EstimatorObserver<NotifiedArgument> extends Observer<NotifiedArgument> {
    private ticks: number = 0;
    private estimation: NotifiedArgument;

    constructor(estimation: NotifiedArgument) {
        super()
        this.estimation = estimation
    }

    onTick(e: NotifiedArgument) {
        this.ticks = this.ticks + 1;
        this.stateDispatcher(e)
    }

    showTicks() {
        return this.ticks;
    }

    update(e: NotifiedArgument): void {
        this.onTick(e)
    }
}

export const estimatorObserver = new EstimatorObserver(0)