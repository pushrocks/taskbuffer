/// <reference types="q" />
import * as plugins from "./taskbuffer.plugins";
import * as helpers from "./taskbuffer.classes.helpers";
export interface ITaskFunction {
    (): PromiseLike<any>;
}
export declare class Task {
    name: string;
    task: any;
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
    trigger(): plugins.Q.Promise<{}>;
    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered(): PromiseLike<any>;
    /**
     * trigger task buffered.
     */
    triggerBuffered(): PromiseLike<any>;
    state: string;
}
