/// <reference path="../ts/typings/main.d.ts" />
import taskbuffer = require("../dist/index");
let should = require("should");
let plugins = {
    q: require("q")
}

//setup some testData to work with
let testTask:taskbuffer.Task;
let testTaskFunction = function(){
    let done = plugins.q.defer();
    console.log("main function executed!")
    done.resolve();
    return done.promise;
}
let testPreTask = new taskbuffer.Task({
    taskFunction:function(){
        console.log("preTask executed");
    },
    preTask:testTask
});

describe("taskbuffer",function(){
    describe(".Task",function(){
        it("new Task() should return a new task",function(){
            testTask = new taskbuffer.Task({taskFunction:testTaskFunction,preTask:testPreTask});
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
        it("testTask.trigger() should return Promise",function(){
            testTask.trigger().should.be.Promise();
        });
        it("testTask.trigger() returned Promise should be fullfilled",function(done){
            testTask.trigger()
                .then(done);
        });
    });
});