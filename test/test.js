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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBQ2hELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUNwRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsUUFBUSxDQUFDLFlBQVksRUFBQztJQUNsQixRQUFRLENBQUMsU0FBUyxFQUFDO1FBQ2YsSUFBSSxRQUFRLENBQUM7UUFDYixFQUFFLENBQUMsMENBQTBDLEVBQUM7WUFDMUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBQztZQUNyQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHVCQUF1QixFQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsc0RBQXNELEVBQUM7WUFDdEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHMvdHlwaW5ncy9tYWluLmQudHNcIiAvPlxudmFyIHRhc2tidWZmZXIgPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleFwiKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZShcIi4uL2Rpc3QvdGFza2J1ZmZlci5jbGFzc2VzXCIpO1xudmFyIHNob3VsZCA9IHJlcXVpcmUoXCJzaG91bGRcIik7XG5kZXNjcmliZShcInRhc2tidWZmZXJcIixmdW5jdGlvbigpe1xuICAgIGRlc2NyaWJlKFwiLnRhc2soKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0ZXN0VGFzaztcbiAgICAgICAgaXQoXCJzaG91bGQgcmV0dXJuIGEgbmV3IHRhc2sgdG8gdmFyIHRlc3RUYXNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRlc3RUYXNrID0gdGFza2J1ZmZlci50YXNrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwidGVzdFRhc2sgc2hvdWxkIGJlIGluc3RhbmNlIG9mIFRhc2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGVzdFRhc2suc2hvdWxkLmJlLmluc3RhbmNlb2YoY2xhc3Nlcy5UYXNrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KFwidGVzdFRhc2suaWRsZSBpcyB0cnVlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghdGVzdFRhc2suaWRsZSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGVzdFRhc2suaWRsZSBpcyBub3QgdHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGl0KFwidGVzdFRhc2sucnVubmluZyBpcyB0eXBlIGJvb2xlYW4gYW5kIGluaXRpYWxseSBmYWxzZVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0ZXN0VGFzay5ydW5uaW5nLnNob3VsZC5iZS50eXBlKFwiYm9vbGVhblwiKTtcbiAgICAgICAgICAgIHRlc3RUYXNrLnJ1bm5pbmcuc2hvdWxkLmJlLmZhbHNlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il19
