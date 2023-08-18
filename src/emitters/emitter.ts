import { EventEmitter } from "@angular/core";

export class Emitter{
    static emitter = new EventEmitter<boolean>();
    static display = new EventEmitter<number>();
}