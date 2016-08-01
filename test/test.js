"use strict";
require("typings-test");
const taskbuffer = require("../dist/index");
let should = require("should");
const q = require("q");
// setup some testData to work with
let testTask;
let testTaskFunction = function () {
    let done = q.defer();
    console.log("main function executed!");
    done.resolve();
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBTyxVQUFVLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDN0MsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLE1BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFBO0FBRXZCLG1DQUFtQztBQUNuQyxJQUFJLFFBQXdCLENBQUM7QUFDN0IsSUFBSSxnQkFBZ0IsR0FBRztJQUNuQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQUNELElBQUksV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztJQUNsQyxZQUFZLEVBQUM7UUFDVCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxPQUFPLEVBQUMsUUFBUTtDQUNuQixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsWUFBWSxFQUFDO0lBQ2xCLFFBQVEsQ0FBQyxPQUFPLEVBQUM7UUFDYixFQUFFLENBQUMscUNBQXFDLEVBQUM7WUFDckMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFBQyxPQUFPLEVBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBQztZQUN6QyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHVCQUF1QixFQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsc0RBQXNELEVBQUM7WUFDdEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMENBQTBDLEVBQUM7WUFDMUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMERBQTBELEVBQUMsVUFBUyxJQUFJO1lBQ3ZFLFFBQVEsQ0FBQyxPQUFPLEVBQUU7aUJBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDZDQUE2QyxFQUFDLFVBQVMsSUFBSTtZQUMxRCxJQUFJLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO1lBQ3pFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxXQUFXLEVBQUM7UUFDakIsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxhQUFhLEdBQUc7WUFDaEIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEVBQUMsT0FBTztnQkFDWixZQUFZLEVBQUM7b0JBQ1QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7YUFDSixDQUFDO1lBQ0YsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEVBQUMsT0FBTztnQkFDWixZQUFZLEVBQUU7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7YUFDSixDQUFDO1NBQ0wsQ0FBQztRQUNGLEVBQUUsQ0FBQyw4QkFBOEIsRUFBQyxVQUFTLElBQUk7WUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUNyQyxJQUFJLEVBQUMsWUFBWTtnQkFDakIsU0FBUyxFQUFDLGFBQWE7YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGNBQWMsRUFBQztRQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBSSxFQUFDLFFBQVE7WUFDYixZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QixVQUFVLENBQUM7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLElBQUksRUFBQyxRQUFRO1lBQ2IsWUFBWSxFQUFFO2dCQUNWLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0IsVUFBVSxDQUFDO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztZQUM1QixJQUFJLEVBQUMsUUFBUTtZQUNiLFlBQVksRUFBRTtnQkFDVixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUMsVUFBUyxJQUFJO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQy9DLFNBQVMsRUFBQyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDO2FBQ2hDLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDNUIsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyJ9