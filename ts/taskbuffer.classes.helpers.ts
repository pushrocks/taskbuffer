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


export let isTaskTouched = (task:Task, touchedTasksArray:Task[]):boolean => {
    return false;
}

export let runTask = function(taskArg:Task,optionsArg?:{touchedTasksArray:Task[]}){
    let done = plugins.Q.defer();
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
                let done2 = plugins.Q.resolve();
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
                let done2 = plugins.Q.resolve();
                done2.resolve();
                return done2.promise;
            }
        })
        .then(() => {
            done.resolve();
        })
        
    return done.promise;
};