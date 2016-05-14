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
    trigger(): any;
    triggerUnBuffered(): any;
    triggerBuffered(): any;
    state: string;
}
