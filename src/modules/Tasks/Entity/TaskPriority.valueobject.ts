interface TaskIdProps {
    id: number;
    name: string;
}


interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public readonly props: T;

    constructor (props: T) {
      this.props = Object.freeze(props);
    }
}

export class TaskPriority extends ValueObject<TaskIdProps> {
    
    private constructor (props: TaskIdProps) {
        super(props)
    }

    get name() {
        return this.props.name;
    }

    public static create(value: string) {
        
    }
}