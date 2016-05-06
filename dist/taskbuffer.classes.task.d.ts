export declare class Task {
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
    });
    trigger(): any;
    triggerUnBuffered(): any;
    triggerBuffered(): any;
    state: string;
}
