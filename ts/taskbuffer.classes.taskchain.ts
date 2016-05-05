/// <reference path="./typings/main.d.ts" />
import * as plugins from "./taskbuffer.plugins";
import {Task} from "./taskbuffer.classes";
import helpers = require("./taskbuffer.classes.helpers");

export class Taskchain extends Task {
    taskArray:Task[];
    
    constructor(taskArrayArg:Task[]|Task){
        super({
            taskFunction: () => { // this is the function that gets executed when TaskChain is triggered
                if(this.taskArray.length = 0) return; //make sure there is actually a Task available to execute
                let startDeferred = plugins.Q.defer(); // this is the starting Deferred object 
                let promisePointer = startDeferred.promise;
                for(let keyArg in this.taskArray){
                    promisePointer.then(function(){
                        promisePointer = this.taskArray[keyArg].trigger();
                        return promisePointer;
                    })
                };
                startDeferred.resolve();
            }
        });
    }
    addTask(taskArg:Task){
        this.taskArray.push(taskArg);
    };
    removeTask(taskArg:Task){
        //TODO
    };
    shiftTask(){
        
    };
};

let myTask = new Taskchain(
    new Task({
        taskFunction:function(){}
    })
);