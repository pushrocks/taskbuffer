import plugins = require("./taskbuffer.plugins");
import { Task, ITaskFunction } from "./taskbuffer.classes.task";
export declare let emptyTaskFunction: ITaskFunction;
export declare let isTask: (taskArg: Task) => boolean;
export declare let isTaskTouched: (taskArg: Task, touchedTasksArray: Task[]) => boolean;
export declare let runTask: (taskArg: Task, optionsArg: {
    x?: any;
    touchedTasksArray?: Task[];
}) => Promise<{}>;
export interface cycleObject {
    cycleCounter: number;
    deferred: plugins.q.Deferred<any>;
}
export declare class CycleCounter {
    task: Task;
    cycleObjectArray: cycleObject[];
    constructor(taskArg: Task);
    getPromiseForCycle(cycleCountArg: number): Promise<{}>;
    informOfCycle(x: any): void;
}
export declare class BufferRunner {
    task: Task;
    bufferCounter: number;
    bufferMax: number;
    running: boolean;
    constructor(taskArg: Task);
    private _run(x);
    setBufferMax(bufferMaxArg: number): void;
    trigger(x: any): Promise<any>;
}
