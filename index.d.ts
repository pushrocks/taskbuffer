/// <reference path="ts/typings/main.d.ts" />
declare module TaskbufferPlugins {
    var init: () => void;
}
declare class Task {
    task: any;
    state: string;
    idle: boolean;
    preTask: Task;
    afterTask: Task;
    constructor(taskArg: any, optionsArg: {
        preTask?: Task;
        afterTask?: Task;
    });
    trigger(): void;
    triggerBuffered(): void;
}
declare class TaskChain extends Task {
    constructor(taskArrayArg: Task[]);
}
declare module TaskbufferTask {
    var init: () => (taskArg: any, options?: any) => Task;
}
declare module TaskbufferTaskchain {
    var init: () => any;
}
declare var plugins: void;
