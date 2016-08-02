import { Task } from "./taskbuffer.classes.task";
export declare class Taskchain extends Task {
    taskArray: Task[];
    private _oraObject;
    constructor(optionsArg: {
        taskArray: Task[];
        name?: string;
        log?: boolean;
        buffered?: boolean;
        bufferMax?: number;
    });
    addTask(taskArg: Task): void;
    removeTask(taskArg: Task): void;
    shiftTask(): void;
}
