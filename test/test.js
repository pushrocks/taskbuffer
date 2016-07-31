"use strict";
/// <reference path="../ts/typings/main.d.ts" />
const taskbuffer = require("../dist/index");
let should = require("should");
let plugins = {
    q: require("q")
};
// setup some testData to work with
let testTask;
let testTaskFunction = function () {
    let done = plugins.q.defer();
    console.log("main function executed!");
    done.resolve();
    return done.promise;
};
let testPreTask = new taskbuffer.Task({
    taskFunction: function () {
        console.log("preTask executed");
    },
    preTask: testTask
});
describe("taskbuffer", function () {
    describe(".Task", function () {
        it("new Task() should return a new task", function () {
            testTask = new taskbuffer.Task({ taskFunction: testTaskFunction, preTask: testPreTask });
        });
        it("testTask should be and instance of Task", function () {
            testTask.should.be.instanceof(taskbuffer.Task);
        });
        it("testTask.idle is true", function () {
            if (!testTask.idle) {
                throw new Error("testTask.idle is not true");
            }
        });
        it("testTask.running is type boolean and initially false", function () {
            testTask.running.should.be.type("boolean");
            testTask.running.should.be.false();
        });
        it("testTask.trigger() should return Promise", function () {
            testTask.trigger().should.be.Promise();
        });
        it("testTask.trigger() returned Promise should be fullfilled", function (done) {
            testTask.trigger()
                .then(done);
        });
        it("should run a task without pre and afterTask", function (done) {
            let localTestTask = new taskbuffer.Task({ taskFunction: testTaskFunction });
            localTestTask.trigger().then(done);
        });
    });
    describe("Taskchain", function () {
        let testTaskchain;
        let testTaskArray = [
            new taskbuffer.Task({
                name: "task1",
                taskFunction: function () {
                    let done = plugins.q.defer();
                    setTimeout(done.resolve, 2000);
                    return done.promise;
                }
            }),
            new taskbuffer.Task({
                name: "task2",
                taskFunction: function () {
                    let done = plugins.q.defer();
                    setTimeout(done.resolve, 2000);
                    return done.promise;
                }
            }),
        ];
        it("should run tasks in sequence", function (done) {
            this.timeout(5000);
            testTaskchain = new taskbuffer.Taskchain({
                name: "Taskchain1",
                taskArray: testTaskArray
            });
            testTaskchain.trigger().then(done);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdEQUFnRDtBQUNoRCxNQUFPLFVBQVUsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUM3QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsSUFBSSxPQUFPLEdBQUc7SUFDVixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQztDQUNsQixDQUFBO0FBRUQsbUNBQW1DO0FBQ25DLElBQUksUUFBd0IsQ0FBQztBQUM3QixJQUFJLGdCQUFnQixHQUFHO0lBQ25CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQUNELElBQUksV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztJQUNsQyxZQUFZLEVBQUM7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELE9BQU8sRUFBQyxRQUFRO0NBQ25CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUM7SUFDbEIsUUFBUSxDQUFDLE9BQU8sRUFBQztRQUNiLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBQztZQUNyQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixFQUFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlDQUF5QyxFQUFDO1lBQ3pDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFD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