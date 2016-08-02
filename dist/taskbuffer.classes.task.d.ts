import * as helpers from "./taskbuffer.classes.helpers";
export interface ITaskFunction {
    (x?: any): PromiseLike<any>;
}
export declare class Task {
    name: string;
    taskFunction: ITaskFunction;
    buffered: boolean;
    preTask: Task;
    afterTask: Task;
    running: boolean;
    bufferRunner: helpers.BufferRunner;
    cycleCounter: helpers.CycleCounter;
    idle: boolean;
    private _state;
    constructor(optionsArg: {
        taskFunction: ITaskFunction;
        preTask?: Task;
        afterTask?: Task;
        buffered?: boolean;
        bufferMax?: number;
        name?: string;
    });
    /**
     * trigger the task. Will trigger buffered if this.buffered is true
     */
    trigger(x?: any): PromiseLike<any>;
    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered(x?: any): PromiseLike<any>;
    /**
     * trigger task buffered.
     */
    triggerBuffered(x?: any): PromiseLike<any>;
    state: string;
}
