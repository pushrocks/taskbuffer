/// <reference types="q" />
import * as plugins from "./taskbuffer.plugins";
export declare class Task {
    name: string;
    task: any;
    running: boolean;
    idle: boolean;
    buffered: boolean;
    bufferCounter: number;
    bufferMax: number;
    private _counterTriggerAbsolute;
    private _state;
    preTask: Task;
    afterTask: Task;
    constructor(optionsArg: {
        taskFunction: any;
        preTask?: Task;
        afterTask?: Task;
        buffered?: boolean;
        bufferMax?: number;
        name?: string;
    });
    trigger(): plugins.Q.Promise<{}>;
    triggerUnBuffered(): plugins.Q.Promise<{}>;
    triggerBuffered(): plugins.Q.Promise<{}>;
    state: string;
}
