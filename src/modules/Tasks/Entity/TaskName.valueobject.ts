import { ValueObject } from "core/domain/ValueObject";
import { Result } from "core/logic/Result";

interface NameProps {
    value: string;
}

export class TaskName extends ValueObject<NameProps> {
    
    private constructor (props: NameProps) {
        super(props)
    }

    get name() {
        return this.props.value;
    }

    public static create(value: string): Result<TaskName | string> {
        if(value.length < 2) {
            return Result.fail<TaskName>('Title must have at least length of 2');
        }
        return Result.ok<TaskName>(new TaskName({ value }));
    }
}