/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Identifier } from "./Identifier";

export class UniqueEntityID extends Identifier<string | number | undefined>{

    constructor (id?: string | number) {
        super(id)
    }
}