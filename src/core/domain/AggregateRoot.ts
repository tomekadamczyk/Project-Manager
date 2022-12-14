import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityId";

export abstract class AggregateRoot<T> extends Entity<T> {
  
    get id (): UniqueEntityID {
      return this._id;
    }
}