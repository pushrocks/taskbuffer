/// <reference path="./typings/main.d.ts" />
import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"

export class Task {
    task:function;
    idle:boolean;
    running:boolean;
    buffered:boolean;
    private _counterBufferRelative;
    private _counterTriggerAbsolute;
    private _state:string;
    preTask:Task;
    afterTask:Task;

    constructor(taskArg,optionsArg:{preTask?:Task,afterTask?:Task, buffered?:boolean} = {}){
        var options = optionsArg;
        this.task = taskArg;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.idle = true;
        this.running = false;
        if (typeof options.buffered === "boolean"){
            this.buffered = options.buffered;
        } else {
            this.buffered = false;
        }
    }
    trigger(){
        let done = plugins.Q.defer();
        helpers.runTask(this.preTask)
            .then(function(){

            })
            .then(function(){

            })
            .then(function(){
                done.resolve();
            });
       return done.promise;
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