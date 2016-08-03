import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"

//interfaces
import {Promise} from "q";
export {Promise} from "q";

export interface ITaskFunction {
    (x?:any):PromiseLike<any>;
}

export class Task {
    name:string;
    taskFunction:ITaskFunction;
    buffered:boolean;
    preTask:Task;
    afterTask:Task;

    // initialize by default
    running:boolean = false;
    bufferRunner = new helpers.BufferRunner(this);
    cycleCounter = new helpers.CycleCounter(this);
    idle:boolean = true;
    private _state:string = "ready";

    constructor(optionsArg:{
        taskFunction:ITaskFunction,
        preTask?:Task,
        afterTask?:Task,
        buffered?:boolean,
        bufferMax?:number,
        name?:string
    }){
        var options = optionsArg;
        this.taskFunction = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.idle = !this.running;
        this.buffered = options.buffered;
        this.bufferRunner.setBufferMax(options.bufferMax);
        this.name = options.name;
    }
    
    /**
     * trigger the task. Will trigger buffered if this.buffered is true
     */
    trigger(x?):Promise<any> {
        if(this.buffered) {
            return this.triggerBuffered(x)
        }
        else {
            return this.triggerUnBuffered(x);
        };
    };

    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered(x?):Promise<any>{
        return helpers.runTask(this,{x:x});
    }
    
    /**
     * trigger task buffered.
     */
    triggerBuffered(x?):Promise<any>{
        return this.bufferRunner.trigger(x);
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