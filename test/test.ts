/// <reference path="../ts/typings/main.d.ts" />
import taskbuffer = require("../dist/index");
let should = require("should");
describe("taskbuffer",function(){
    describe(".task()",function(){
        var testTask;
        it("should return a new task to var testTask",function(){
            testTask = new taskbuffer.Task({taskFunction:function(){}});
        });

        it("testTask should be and instance of Task",function(){
            testTask.should.be.instanceof(taskbuffer.Task);
        });
        it("testTask.idle is true",function(){
            if (!testTask.idle){
                throw new Error("testTask.idle is not true");
            }
        });
        it("testTask.running is type boolean and initially false",function(){
            testTask.running.should.be.type("boolean");
            testTask.running.should.be.false();
        });
    });
});