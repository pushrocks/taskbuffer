export declare class Task {
    task: any;
    idle: boolean;
    running: boolean;
    buffered: boolean;
    bufferCounter: number;
    bufferMax: number;
    private _counterTriggerAbsolute;
    private _state;
    preTask: Task;
    afterTask: Task;
    constructor(taskArg: any, optionsArg?: {
        preTask?: Task;
        afterTask?: Task;
        buffered?: boolean;
    });
    trigger(): any;
    triggerBuffered(): void;
    state: string;
}
