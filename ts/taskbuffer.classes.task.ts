/// <reference path="./typings/main.d.ts" />
import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"

export class Task {
    task:any;
    idle:boolean;
    running:boolean;
    buffered:boolean;
    bufferCounter:number;
    bufferMax:number;
    private _counterTriggerAbsolute:number;
    private _state:string;
    preTask:Task;
    afterTask:Task;

    constructor(optionsArg:{taskFunction:any,preTask?:Task,afterTask?:Task, buffered?:boolean}){
        if (!optionsArg){optionsArg = {taskFunction:function(){}}}
        var options = optionsArg;
        this.task = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.idle = true;
        this.running = false;
        this.buffered = options.buffered;
    }
    trigger(){
        let done = plugins.Q.defer();
        return helpers.runTask(this)
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