/// <reference path="./index.ts" />
module TaskbufferTask {
    export var init = function(){
        var task = function(taskArg,options?){
            var task = taskArg
            return new Task(task,options);
        };
        return task;
    }
}