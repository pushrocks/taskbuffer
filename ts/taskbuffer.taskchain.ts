/// <reference path="./index.ts" />
module TaskbufferTaskchain {
    export var init = function(){
        var taskChain = function(taskArrayArg:Task[]){
            return new TaskChain();
        };
        return taskChain();
    }
}