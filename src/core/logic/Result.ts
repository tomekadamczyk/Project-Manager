type ResultState = 'success' | 'error';

export class Result<T> {
    public state: ResultState;
    public error: T | string | undefined;
    private _value: T | undefined;

    public constructor(state: ResultState, error?: T | string, value?: T) {
        this.state = state;
        if(error) {

            this.error = error;
        }
        if(value) {

            this._value = value;
        
        }
        
        Object.freeze(this);
    }

    public getValue() {
        if(this.state === 'error') {
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
        }
        return this._value;
    }

    public errorValue (): T {
        return this.error as T;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>('success', undefined, value)
    }

    public static fail<U>(error?: string): Result<U> {
        return new Result<U>('error', error)
    }
}