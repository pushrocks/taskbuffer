/// <reference path="./typings/main.d.ts" />
import plugins = require("./taskbuffer.plugins");
import {Task} from "./taskbuffer.classes"

export let emptyTaskFunction = function(){
    let done = plugins.Q.defer();
    done.resolve();
    return done.promise;
};

export let isTask = function(taskArg):boolean{
    if(
        taskArg instanceof Task
        && typeof taskArg.task === "function"
    ){
        return true;
    } else {
        return false;
    }
};


export let isTaskTouched = (taskArg:Task, touchedTasksArray:Task[]):boolean => {
    let result = false;
    for (let keyArg in touchedTasksArray){
        if(taskArg === touchedTasksArray[keyArg]){
            result = true;
        }
    }
    return result;
}

export let runTask = function(taskArg:Task,optionsArg:{touchedTasksArray:Task[]} = {touchedTasksArray:[]}){
    let done = plugins.Q.defer();
    updateTaskStatus(taskArg,"running");
    done.promise.then(function(){updateTaskStatus(taskArg,"idle")})
    let localDeferred = plugins.Q.defer();
    let touchedTasksArray:Task[];
    if(optionsArg.touchedTasksArray){
        touchedTasksArray = optionsArg.touchedTasksArray;
    } else {
        touchedTasksArray = [];
    }
    touchedTasksArray.push(taskArg);
    localDeferred.promise
        .then(() =>{
            if(taskArg.preTask && !isTaskTouched(taskArg.preTask,touchedTasksArray)){
                return runTask(taskArg.preTask,{touchedTasksArray:touchedTasksArray})
            } else {
                let done2 = plugins.Q.defer();
                done2.resolve();
                return done2.promise;
            }
        })
        .then(() => {
            return taskArg.task();
        })
        .then(() => {
            if(taskArg.afterTask && !isTaskTouched(taskArg.afterTask,touchedTasksArray)){
                return runTask(taskArg.afterTask,{touchedTasksArray:touchedTasksArray})
            } else {
                let done2 = plugins.Q.defer();
                done2.resolve();
                return done2.promise;
            }
        })
        .then(() => {
            done.resolve();
        });
    localDeferred.resolve();
    return done.promise;
};

export let runBufferedTask = (taskArg:Task) => {
    let recursiveBufferRunner = () => {
        if(taskArg.bufferCounter > 0){
            taskArg.bufferCounter--;
            runTask(taskArg)
                .then(recursiveBufferRunner);
        }
    }
}

export let updateTaskStatus = (taskArg,statusArg:string) => {
    switch (statusArg) {
        case "running":
            taskArg.running = true;
            taskArg.idle = false;
            break;
        case "idle":
            taskArg.running = false;
            taskArg.idle = true;
            break;
        default:
            throw new Error("status not recognised");
    }
}