import plugins = require("./taskbuffer.plugins");
import {Task,ITaskFunction} from "./taskbuffer.classes.task";

export let emptyTaskFunction:ITaskFunction = function(){
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
    taskArg.running = true;
    done.promise.then(function(){taskArg.running = false});
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
            taskArg.runningBuffered = true;
            taskArg.bufferCounter--;
            runTask(taskArg)
                .then(recursiveBufferRunner);
        } else {
            taskArg.runningBuffered = false;
        }
    }
};