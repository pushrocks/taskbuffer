import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"


export interface ITaskFunction {
    ():PromiseLike<any>;
}

export class Task {
    name:string;
    task:any;
    running:boolean = false;
    runningBuffered:boolean = false;
    idle:boolean = true;
    buffered:boolean = false;
    bufferCounter:number;
    bufferMax:number = 1;
    private _counterTriggerAbsolute:number = 0;
    private _state:string;
    preTask:Task;
    afterTask:Task;

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
        this.running = false;
        this.idle = !this.running && !this.runningBuffered;
        this.buffered = options.buffered;
        this.bufferMax = options.bufferMax;
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
    triggerUnBuffered(){
        return helpers.runTask(this);
    }
    
    /**
     * trigger task buffered.
     */
    triggerBuffered(){
        var done = plugins.Q.defer();
        if(!(this.bufferCounter >= this.bufferMax)){
            this.bufferCounter++
        };
        if(!this.runningBuffered){
            helpers.runBufferedTask(this);
        };
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