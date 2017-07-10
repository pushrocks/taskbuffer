import * as helpers from './taskbuffer.classes.helpers';
export interface ITaskFunction {
    (x?: any): PromiseLike<any>;
}
export declare class Task {
    name: string;
    taskFunction: ITaskFunction;
    buffered: boolean;
    bufferMax: number;
    execDelay: number;
    preTask: Task;
    afterTask: Task;
    running: boolean;
    bufferRunner: helpers.BufferRunner;
    cycleCounter: helpers.CycleCounter;
    idle: boolean;
    private _state;
    constructor(optionsArg: {
        /**
         * the task function to run, must return promise
         */
        taskFunction: ITaskFunction;
        /**
         * any other task to run before
         */
        preTask?: Task;
        /**
         * any other task to run after
         */
        afterTask?: Task;
        /**
         * wether this task should run buffered
         */
        buffered?: boolean;
        /**
         * the maximum buffer
         */
        bufferMax?: number;
        /**
         * the execution delay, before the task is executed
         * only makes sense when running in buffered mode
         */
        execDelay?: number;
        /**
         * the name of the task
         */
        name?: string;
    });
    /**
     * trigger the task. Will trigger buffered if this.buffered is true
     */
    trigger(x?: any): Promise<any>;
    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered(x?: any): Promise<any>;
    /**
     * trigger task buffered.
     */
    triggerBuffered(x?: any): Promise<any>;
    state: string;
}
