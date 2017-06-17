import { Task } from './taskbuffer.classes.task';
export declare class Taskparallel extends Task {
    taskArray: Task[];
    constructor(optionsArg: {
        taskArray: Task[];
    });
}
