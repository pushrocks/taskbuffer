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
    constructor(optionsArg: {
        taskFunction: any;
        preTask?: Task;
        afterTask?: Task;
        buffered?: boolean;
        bufferMax?: number;
    });
    trigger(): void;
    triggerUnBuffered(): any;
    triggerBuffered(): any;
    state: string;
}
