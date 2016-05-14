import { Task } from "./taskbuffer.classes";
export declare class Taskchain extends Task {
    taskArray: Task[];
    private _oraObject;
    constructor(taskArrayArg: Task[] | Task);
    addTask(taskArg: Task): void;
    removeTask(taskArg: Task): void;
    shiftTask(): void;
}
