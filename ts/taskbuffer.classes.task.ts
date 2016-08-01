import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"


export interface ITaskFunction {
    ():PromiseLike<any>;
}

export class Task {
    name:string;
    task:any;
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
        this.task = optionsArg.taskFunction;
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

    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered():PromiseLike<any>{
        return helpers.runTask(this);
    }
    
    /**
     * trigger task buffered.
     */
    triggerBuffered():PromiseLike<any>{
        return this.bufferRunner.trigger();
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