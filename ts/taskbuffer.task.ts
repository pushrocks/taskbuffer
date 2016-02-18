/// <reference path="./typings/main.d.ts" />
import classes = require("./taskbuffer.classes");
var task = function(taskArg,options?){
    var task = taskArg
    return new classes.Task(task,options);
};
export = task;