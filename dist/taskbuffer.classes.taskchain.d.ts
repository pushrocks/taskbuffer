import { Task } from "./taskbuffer.classes";
export declare class Taskchain extends Task {
    taskArray: Task[];
    private _oraObject;
    constructor(optionsArg: {
        name?: string;
        log?: boolean;
        taskArray: Task[];
    });
    addTask(taskArg: Task): void;
    removeTask(taskArg: Task): void;
    shiftTask(): void;
    trigger(): any;
}
