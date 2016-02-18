/// <reference path="../ts/typings/main.d.ts" />
var taskbuffer = require("../dist/index.js");
describe("taskbuffer.task",function(){
    describe(".task",function(){
        it("should return a new task",function(){
            var myTask = taskbuffer.task();
        })
    });
});