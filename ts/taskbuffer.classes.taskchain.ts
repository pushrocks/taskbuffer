/// <reference path="./typings/main.d.ts" />
import * as plugins from "./taskbuffer.plugins";
import {Task} from "./taskbuffer.classes.task";
import helpers = require("./taskbuffer.classes.helpers");

export class Taskchain extends Task {
    taskArray:Task[];
    private _oraObject:plugins.beautylog.Ora;
    constructor(optionsArg:{
        name?:string,
        log?:boolean,
        taskArray:Task[]
    }){
        let options = plugins.lodash.assign(
            {
                name:"unnamed Taskchain",
                log:false
            },
            optionsArg,
            {
                taskFunction: () => { // this is the function that gets executed when TaskChain is triggered
                    let done = plugins.Q.defer(); // this is the starting Deferred object 
                    let taskCounter = 0;
                    let iterateTasks = () => {
                        if(typeof this.taskArray[taskCounter] != "undefined"){
                            this._oraObject.text(this.name + " running: Task" + this.taskArray[taskCounter].name);
                            this.taskArray[taskCounter].trigger()
                                .then(()=>{
                                    this._oraObject.log(this.taskArray[taskCounter].name,"ok");
                                    taskCounter++;
                                    iterateTasks();
                                });     
                        } else {
                            this._oraObject.endOk("Taskchain \"" + this.name +  "\" completed successfully");
                            done.resolve();
                        }
                    };
                    iterateTasks();
                    return done.promise;
                }
            }
        );
        super(options);
        this.taskArray = optionsArg.taskArray;
        this._oraObject = new plugins.beautylog.Ora("Taskchain idle","blue");
    }
    addTask(taskArg:Task){
        this.taskArray.push(taskArg);
    };
    removeTask(taskArg:Task){
        //TODO
    };
    shiftTask(){
        
    };
    trigger(){
        this._oraObject.start(this.name + " running...");
        return helpers.runTask(this);
    }
};