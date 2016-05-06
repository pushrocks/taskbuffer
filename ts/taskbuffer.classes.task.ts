/// <reference path="./typings/main.d.ts" />
import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"


export class Task {
    task:any;
    running:boolean;
    idle:boolean;
    buffered:boolean;
    bufferCounter:number;
    bufferMax:number;
    private _counterTriggerAbsolute:number;
    private _state:string;
    preTask:Task;
    afterTask:Task;

    constructor(optionsArg:{taskFunction:any,preTask?:Task,afterTask?:Task, buffered?:boolean, bufferMax?:number}){
        if (!optionsArg){optionsArg = {taskFunction:function(){}}}
        var options = optionsArg;
        this.task = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.running = false;
        this.idle = true;
        this.buffered = options.buffered;
        this.bufferMax = options.bufferMax;
    }
    
    trigger(){
        let done = plugins.Q.defer();
        if(this.buffered) {
            this.triggerBuffered()
                .then(done.resolve);
        }
        else {
            this.triggerUnBuffered()
                .then(done.resolve);
        };
        return done.promise;
    };
    triggerUnBuffered(){
        return helpers.runTask(this);
    }
    triggerBuffered(){
        var done = plugins.Q.defer();
        if(!(this.bufferCounter >= this.bufferMax)){
            this.bufferCounter++
        }
        helpers.runBufferedTask(this);
        return done.promise;
    }

    get state():string {
        return this._state;
    }
    set state(stateArg:string){
        if (stateArg == "locked"){
            this._state = "locked";
        } else {
            plugins.beautylog.error("state type " + stateArg.blue + " could not be set");
        }
    }
}