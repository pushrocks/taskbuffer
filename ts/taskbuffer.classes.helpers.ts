/// <reference path="./typings/main.d.ts" />
import plugins = require("./taskbuffer.plugins");
import classes = require("./taskbuffer.classes");

export var emptyTaskFunction = function(){
    var done = plugins.Q.defer();
    done.resolve();
    return done.promise;
};

export var isTask = function(taskArg):boolean{
    if(
        taskArg instanceof classes.Task
        && typeof taskArg.task === "function"
    ){
        return true;
    } else {
        return false;
    }
};

export var runTask = function(taskArg){
    var done = plugins.Q.defer();
    var taskReturn;
    if(isTask(taskArg)){
        taskReturn = taskArg.task();
    }
    return done.promise;
};