/// <reference path="./typings/main.d.ts" />
var taskbuffer = require("../index.js");
describe("taskbuffer.task",function(){
    describe(".task",function(){
        it("should return a new task",function(){
            var myTask = taskbuffer.task();
        })
    });
});