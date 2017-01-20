"use strict";
require("typings-test");
const taskbuffer = require("../dist/index");
const should = require("should");
const q = require("q");
// setup some testData to work with
let testTask;
let testTaskFunction = function () {
    let done = q.defer();
    console.log("main function executed!");
    done.resolve();
    return done.promise;
};
let testTaskFunctionTimeout = function () {
    let done = q.defer();
    console.log("main function started!");
    setTimeout(() => {
        console.log("main function ended!");
        done.resolve();
    }, 2000);
    return done.promise;
};
let testPreTask = new taskbuffer.Task({
    taskFunction: function () {
        let done = q.defer();
        console.log("preTask executed");
        done.resolve();
        return done.promise;
    },
    preTask: testTask
});
// some more tasks to wirj with
let task1 = new taskbuffer.Task({
    name: "Task 1",
    taskFunction: () => {
        let done = q.defer();
        console.log("Task1 started");
        setTimeout(() => {
            console.log("Task1 executed");
            done.resolve();
        }, 5000);
        return done.promise;
    }
});
let task2 = new taskbuffer.Task({
    name: "Task 1",
    taskFunction: () => {
        let done = q.defer();
        console.log("Task2 started");
        setTimeout(() => {
            console.log("Task2 executed");
            done.resolve();
        }, 5000);
        return done.promise;
    }
});
let task3 = new taskbuffer.Task({
    name: "Task 3",
    taskFunction: () => {
        let done = q.defer();
        console.log("Task3 started");
        setTimeout(() => {
            console.log("Task3 executed");
            done.resolve();
        }, 5000);
        return done.promise;
    }
});
// the actual tests
describe("taskbuffer", function () {
    describe(".Task", function () {
        it("new Task() should return a new task", function () {
            testTask = new taskbuffer.Task({ taskFunction: testTaskFunction, preTask: testPreTask });
        });
        it("testTask should be and instance of Task", function () {
            should(testTask).be.instanceof(taskbuffer.Task);
        });
        it("testTask.idle is true", function () {
            if (!testTask.idle) {
                throw new Error("testTask.idle is not true");
            }
        });
        it("testTask.running is type boolean and initially false", function () {
            should(testTask.running).be.type("boolean");
            should(testTask.running).be.false();
        });
        it("testTask.trigger() should return Promise", function () {
            should(testTask.trigger()).be.Promise();
        });
        it("testTask.trigger() returned Promise should be fullfilled", function (done) {
            testTask.trigger()
                .then(done);
        });
        it("should run a task without pre and afterTask", function (done) {
            let localTestTask = new taskbuffer.Task({ taskFunction: testTaskFunction });
            localTestTask.trigger().then(done);
        });
        it("should run buffered", function (done) {
            this.timeout(10000);
            let localTestTask = new taskbuffer.Task({
                taskFunction: testTaskFunctionTimeout,
                buffered: true,
                bufferMax: 2
            });
            localTestTask.trigger();
            localTestTask.trigger();
            localTestTask.trigger();
            localTestTask.trigger().then(() => {
                done();
            });
        });
    });
    describe("Taskchain", function () {
        let testTaskchain;
        let testTaskArray = [
            new taskbuffer.Task({
                name: "task1",
                taskFunction: function () {
                    let done = q.defer();
                    setTimeout(done.resolve, 2000);
                    return done.promise;
                }
            }),
            new taskbuffer.Task({
                name: "task2",
                taskFunction: function () {
                    let done = q.defer();
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
    describe("taskparallel", function () {
        it("should run in Parallel", function (done) {
            this.timeout(7000);
            let testTaskparallel = new taskbuffer.Taskparallel({
                taskArray: [task1, task2, task3]
            });
            testTaskparallel.trigger().then(() => {
                done();
            });
        });
    });
    describe("some flowtests", function () {
        let flowTask1 = new taskbuffer.Task({
            taskFunction: (x) => {
                let done = q.defer();
                console.log("flowTask1");
                console.log(x);
                done.resolve(x);
                return done.promise;
            }
        });
        let flowTaskBuffered = new taskbuffer.Task({
            taskFunction: (x) => {
                let done = q.defer();
                console.log("flowTask1");
                console.log(x);
                done.resolve(x);
                return done.promise;
            },
            buffered: true,
            bufferMax: 1
        });
        let flowTask2 = new taskbuffer.Task({
            taskFunction: (x) => {
                let done = q.defer();
                console.log("flowTask2");
                console.log(x);
                done.resolve(x);
                return done.promise;
            },
            preTask: flowTask1
        });
        let flowTask3 = new taskbuffer.Taskchain({
            taskArray: [flowTask1, flowTask2]
        });
        it("should let a value flow through a task", function (done) {
            flowTask1.trigger(12).then((x) => {
                should.equal(x, 12);
                done();
            }).catch(done);
        });
        it("should let a values flow between tasks", function (done) {
            flowTask2.trigger(12).then((x) => {
                should.equal(x, 12);
                done();
            }).catch(done);
        });
        it("should let a values flow between tasks when buffered", function (done) {
            flowTaskBuffered.trigger(12).then((x) => {
                should.equal(x, 12);
                done();
            }).catch(done);
        });
        it("should let a values flow between tasks in Taskchain", function (done) {
            flowTask3.trigger(12).then((x) => {
                should.equal(x, 12);
                done();
            }).catch(done);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFzQjtBQUN0Qiw0Q0FBNkM7QUFDN0MsaUNBQWtDO0FBQ2xDLHVCQUF1QjtBQUV2QixtQ0FBbUM7QUFDbkMsSUFBSSxRQUF5QixDQUFDO0FBQzlCLElBQUksZ0JBQWdCLEdBQUc7SUFDbkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixJQUFJLHVCQUF1QixHQUFHO0lBQzFCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsVUFBVSxDQUFDO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixJQUFJLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDbEMsWUFBWSxFQUFFO1FBQ1YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0QsT0FBTyxFQUFFLFFBQVE7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