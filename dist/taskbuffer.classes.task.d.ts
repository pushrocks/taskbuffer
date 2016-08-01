/// <reference types="q" />
import * as plugins from "./taskbuffer.plugins";
export interface ITaskFunction {
    (): PromiseLike<any>;
}
export declare class Task {
    name: string;
    task: any;
    running: boolean;
    runningBuffered: boolean;
    idle: boolean;
    buffered: boolean;
    bufferCounter: number;
    bufferMax: number;
    private _counterTriggerAbsolute;
    private _state;
    preTask: Task;
    afterTask: Task;
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
    triggerUnBuffered(): plugins.Q.Promise<{}>;
    /**
     * trigger task buffered.
     */
    triggerBuffered(): plugins.Q.Promise<{}>;
    state: string;
}
