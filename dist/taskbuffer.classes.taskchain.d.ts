import * as classes from "./taskbuffer.classes";
export declare class Taskchain extends classes.Task {
    taskArray: classes.Task[];
    constructor(taskArrayArg: classes.Task[] | classes.Task);
    addTask(taskArg: classes.Task): void;
    removeTask(taskArg: classes.Task): void;
    shiftTask(): void;
}
