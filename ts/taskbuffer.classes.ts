/// <reference path="./typings/main.d.ts" />
import plugins = require("./taskbuffer.plugins");
export class Task {
    task:any;
    idle:boolean;
    buffered:boolean;
    bufferedForced:boolean;
    running:boolean;
    private _state:string;
    preTask:Task;
    afterTask:Task;

    constructor(taskArg,optionsArg?:{preTask?:Task,afterTask?:Task}){
        this.task = taskArg;
    }
    trigger(){
        this.preTask.task()
            .then(this.task)
            .then(this.afterTask.task);
    };
    triggerBuffered(){
        var done = plugins.Q.defer();
    }

    get state():string {
        return this._state;
    }
    set state(stateArg:string){
        if (stateArg == "locked"){
            this._state = "locked";
        } else {
            plugins.beautylog.error("state type" );
        }
    }
}

export class TaskChain extends Task {
    constructor(taskArrayArg:Task[]){
        super({
            task:function(){}
        });
    }
}