import { Task } from "./taskbuffer.classes";
export declare let emptyTaskFunction: () => any;
export declare let isTask: (taskArg: any) => boolean;
export declare let isTaskTouched: (task: Task, touchedTasksArray: Task[]) => boolean;
export declare let runTask: (taskArg: Task, optionsArg?: {
    touchedTasksArray: Task[];
}) => any;
