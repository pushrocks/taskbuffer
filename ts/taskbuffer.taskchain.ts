/// <reference path="./typings/main.d.ts" />
import classes = require("./taskbuffer.classes");
var taskChain = function(taskArrayArg:classes.Task[]){

    return new classes.TaskChain(taskArrayArg);
};
export = taskChain;
