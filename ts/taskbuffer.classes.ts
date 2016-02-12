/// <reference path="./index.ts" />
class Task {
    task:any;
    state:string;
    idle:boolean;
    preTask:Task;
    afterTask:Task;

    constructor(taskArg,optionsArg:{preTask?:Task,afterTask?:Task}){
        this.task = taskArg;
    }
    trigger(){};
    triggerBuffered(){

    }
}

class TaskChain extends Task {
    constructor(taskArrayArg:Task[]){
        super({
            task:function(){}
        });
    }
}