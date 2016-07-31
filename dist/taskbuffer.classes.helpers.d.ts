/// <reference types="q" />
import plugins = require("./taskbuffer.plugins");
import { Task } from "./taskbuffer.classes.task";
export declare let emptyTaskFunction: () => plugins.Q.Promise<{}>;
export declare let isTask: (taskArg: any) => boolean;
export declare let isTaskTouched: (taskArg: Task, touchedTasksArray: Task[]) => boolean;
export declare let runTask: (taskArg: Task, optionsArg?: {
    touchedTasksArray: Task[];
}) => plugins.Q.Promise<{}>;
export declare let runBufferedTask: (taskArg: Task) => void;
export declare let updateTaskStatus: (taskArg: any, statusArg: string) => void;
