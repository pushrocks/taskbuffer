import { Task, ITaskFunction } from './taskbuffer.classes.task';
/**
 * TaskOnce is run exactly once, no matter how often it is triggered
 */
export declare class TaskOnce extends Task {
    hasTriggered: boolean;
    constructor(optionsArg: {
        name?: string;
        taskFunction: ITaskFunction;
    });
}
