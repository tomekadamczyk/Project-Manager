import { Subject } from "core/infra/Observable/Subject";

export class EstimationService {
    private readonly estimations = new Subject<number[]>([]);
    private readonly estimation = new Subject<number>(0);

    getOne(): Subject<number> {
        return this.estimation;
    }

    getAll(): Subject<number[]> {
        return this.estimations;
    }

    addEstimation(estimation: number) {
        this.estimations.notify([...this.estimations.get(), estimation])
        this.estimation.notify(estimation)
    }
}

export const estimatorService = new EstimationService();