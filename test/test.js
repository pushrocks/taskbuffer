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
            this.timeout("7000");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBTyxVQUFVLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDN0MsTUFBTyxNQUFNLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDbEMsTUFBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7QUFFdkIsbUNBQW1DO0FBQ25DLElBQUksUUFBeUIsQ0FBQztBQUM5QixJQUFJLGdCQUFnQixHQUFHO0lBQ25CLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7SUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBSSx1QkFBdUIsR0FBRztJQUMxQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3RDLFVBQVUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ2xDLFlBQVksRUFBRTtRQUNWLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNELE9BQU8sRUFBRSxRQUFRO0NBQ3BCLENBQUMsQ0FBQztBQUdILCtCQUErQjtBQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDNUIsSUFBSSxFQUFFLFFBQVE7SUFDZCxZQUFZLEVBQUU7UUFDVixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixVQUFVLENBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDSCxJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDNUIsSUFBSSxFQUFFLFFBQVE7SUFDZCxZQUFZLEVBQUU7UUFDVixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixVQUFVLENBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDSCxJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDNUIsSUFBSSxFQUFFLFFBQVE7SUFDZCxZQUFZLEVBQUU7UUFDVixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixVQUFVLENBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFDLENBQUM7QUFFSCxtQkFBbUI7QUFDbkIsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUNuQixRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2QsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3RDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseUNBQXlDLEVBQUU7WUFDMUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtZQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDakQsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO1lBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO1lBQzNDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLFVBQVUsSUFBSTtZQUN6RSxRQUFRLENBQUMsT0FBTyxFQUFFO2lCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxVQUFVLElBQUk7WUFDNUQsSUFBSSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUM1RSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsSUFBSTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLElBQUksYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDcEMsWUFBWSxFQUFFLHVCQUF1QjtnQkFDckMsUUFBUSxFQUFDLElBQUk7Z0JBQ2IsU0FBUyxFQUFDLENBQUM7YUFDZCxDQUFDLENBQUM7WUFDSCxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUN6QixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDbEIsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxhQUFhLEdBQUc7WUFDaEIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsT0FBTztnQkFDYixZQUFZLEVBQUU7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7YUFDSixDQUFDO1lBQ0YsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsT0FBTztnQkFDYixZQUFZLEVBQUU7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7YUFDSixDQUFDO1NBQ0wsQ0FBQztRQUNGLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxVQUFVLElBQUk7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsU0FBUyxFQUFFLGFBQWE7YUFDM0IsQ0FBQyxDQUFDO1lBQ0gsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUNyQixFQUFFLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxJQUFJO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO2FBQ25DLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDNUIsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsZ0JBQWdCLEVBQUM7UUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2hDLFlBQVksRUFBRSxDQUFDLENBQVE7Z0JBQ25CLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDdkMsWUFBWSxFQUFFLENBQUMsQ0FBUTtnQkFDbkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxRQUFRLEVBQUMsSUFBSTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2hDLFlBQVksRUFBRSxDQUFDLENBQVE7Z0JBQ25CLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1lBQ0QsT0FBTyxFQUFDLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ3JDLFNBQVMsRUFBQyxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHdDQUF3QyxFQUFDLFVBQVMsSUFBSTtZQUNyRCxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBQyxVQUFTLElBQUk7WUFDckQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0RBQXNELEVBQUMsVUFBUyxJQUFJO1lBQ25FLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMscURBQXFELEVBQUMsVUFBUyxJQUFJO1lBQ2xFLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ25CLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyJ9