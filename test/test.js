/// <reference path="../ts/typings/main.d.ts" />
var taskbuffer = require("../dist/index");
var classes = require("../dist/taskbuffer.classes");
var should = require("should");
describe("taskbuffer", function () {
    describe(".task()", function () {
        var testTask;
        it("should return a new task to var testTask", function () {
            testTask = taskbuffer.task();
        });
        it("testTask should be instance of Task", function () {
            testTask.should.be.instanceof(classes.Task);
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
    });
});
//# sourceMappingURL=test.js.map