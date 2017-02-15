"use strict";
require("typings-test");
const taskbuffer = require("../dist/index");
const smartchai_1 = require("smartchai");
const q = require("smartq");
// setup some testData to work with
let testTask;
let testTaskFunction = function () {
    let done = q.defer();
    console.log('main function executed!');
    done.resolve();
    return done.promise;
};
let testTaskFunctionTimeout = function () {
    let done = q.defer();
    console.log('main function started!');
    setTimeout(() => {
        console.log('main function ended!');
        done.resolve();
    }, 2000);
    return done.promise;
};
let testPreTask = new taskbuffer.Task({
    taskFunction: function () {
        let done = q.defer();
        console.log('preTask executed');
        done.resolve();
        return done.promise;
    },
    preTask: testTask
});
// some more tasks to wirj with
let task1 = new taskbuffer.Task({
    name: 'Task 1',
    taskFunction: () => {
        let done = q.defer();
        console.log('Task1 started');
        setTimeout(() => {
            console.log('Task1 executed');
            done.resolve();
        }, 5000);
        return done.promise;
    }
});
let task2 = new taskbuffer.Task({
    name: 'Task 1',
    taskFunction: () => {
        let done = q.defer();
        console.log('Task2 started');
        setTimeout(() => {
            console.log('Task2 executed');
            done.resolve();
        }, 5000);
        return done.promise;
    }
});
let task3 = new taskbuffer.Task({
    name: 'Task 3',
    taskFunction: () => {
        let done = q.defer();
        console.log('Task3 started');
        setTimeout(() => {
            console.log('Task3 executed');
            done.resolve();
        }, 5000);
        return done.promise;
    }
});
// the actual tests
describe('taskbuffer', function () {
    describe('.Task', function () {
        it('new Task() should return a new task', function () {
            testTask = new taskbuffer.Task({ taskFunction: testTaskFunction, preTask: testPreTask });
        });
        it('testTask should be and instance of Task', function () {
            smartchai_1.expect(testTask).to.be.instanceof(taskbuffer.Task);
        });
        it('testTask.idle is true', function () {
            if (!testTask.idle) {
                throw new Error('testTask.idle is not true');
            }
        });
        it('testTask.running is type boolean and initially false', function () {
            smartchai_1.expect(testTask.running).to.be.a('boolean');
            smartchai_1.expect(testTask.running).to.be.false;
        });
        it('testTask.trigger() expect return Promise', function () {
            smartchai_1.expect(testTask.trigger()).to.be.instanceof(Promise);
        });
        it('testTask.trigger() returned Promise expect be fullfilled', function (done) {
            testTask.trigger()
                .then(done);
        });
        it('expect run a task without pre and afterTask', function (done) {
            let localTestTask = new taskbuffer.Task({ taskFunction: testTaskFunction });
            localTestTask.trigger().then(done);
        });
        it('expect run buffered', function (done) {
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
    describe('Taskchain', function () {
        let testTaskchain;
        let testTaskArray = [
            new taskbuffer.Task({
                name: 'task1',
                taskFunction: function () {
                    let done = q.defer();
                    setTimeout(done.resolve, 2000);
                    return done.promise;
                }
            }),
            new taskbuffer.Task({
                name: 'task2',
                taskFunction: function () {
                    let done = q.defer();
                    setTimeout(done.resolve, 2000);
                    return done.promise;
                }
            })
        ];
        it('expect run tasks in sequence', function (done) {
            this.timeout(5000);
            testTaskchain = new taskbuffer.Taskchain({
                name: 'Taskchain1',
                taskArray: testTaskArray
            });
            testTaskchain.trigger().then(done);
        });
    });
    describe('taskparallel', function () {
        it('expect run in Parallel', function (done) {
            this.timeout(7000);
            let testTaskparallel = new taskbuffer.Taskparallel({
                taskArray: [task1, task2, task3]
            });
            testTaskparallel.trigger().then(() => {
                done();
            });
        });
    });
    describe('some flowtests', function () {
        let flowTask1 = new taskbuffer.Task({
            taskFunction: (x) => {
                let done = q.defer();
                console.log('flowTask1');
                console.log(x);
                done.resolve(x);
                return done.promise;
            }
        });
        let flowTaskBuffered = new taskbuffer.Task({
            taskFunction: (x) => {
                let done = q.defer();
                console.log('flowTask1');
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
                console.log('flowTask2');
                console.log(x);
                done.resolve(x);
                return done.promise;
            },
            preTask: flowTask1
        });
        let flowTask3 = new taskbuffer.Taskchain({
            taskArray: [flowTask1, flowTask2]
        });
        it('should let a value flow through a task', function (done) {
            flowTask1.trigger(12).then((x) => {
                smartchai_1.expect(x).to.equal(12);
                done();
            }).catch(done);
        });
        it('should let a values flow between tasks', function (done) {
            flowTask2.trigger(12).then((x) => {
                smartchai_1.expect(x).to.equal(12);
                done();
            }).catch(done);
        });
        it('expect let a values flow between tasks when buffered', function (done) {
            flowTaskBuffered.trigger(12).then((x) => {
                smartchai_1.expect(x).to.equal(12);
                done();
            }).catch(done);
        });
        it('should let a values flow between tasks in Taskchain', function (done) {
            flowTask3.trigger(12).then((x) => {
                smartchai_1.expect(x).to.equal(12);
                done();
            }).catch(done);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQiw0Q0FBNEM7QUFDNUMseUNBQWtDO0FBQ2xDLDRCQUEyQjtBQUUzQixtQ0FBbUM7QUFDbkMsSUFBSSxRQUF5QixDQUFBO0FBQzdCLElBQUksZ0JBQWdCLEdBQUc7SUFDckIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRCxJQUFJLHVCQUF1QixHQUFHO0lBQzVCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7SUFDckMsVUFBVSxDQUFDO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDcEMsWUFBWSxFQUFFO1FBQ1osSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBQ0QsT0FBTyxFQUFFLFFBQVE7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