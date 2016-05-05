"use strict";
/// <reference path="../ts/typings/main.d.ts" />
var taskbuffer = require("../dist/index");
var should = require("should");
describe("taskbuffer", function () {
    describe(".task()", function () {
        var testTask;
        it("should return a new task to var testTask", function () {
            testTask = new taskbuffer.Task({ taskFunction: function () { } });
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
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdEQUFnRDtBQUNoRCxJQUFPLFVBQVUsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUM3QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsUUFBUSxDQUFDLFlBQVksRUFBQztJQUNsQixRQUFRLENBQUMsU0FBUyxFQUFDO1FBQ2YsSUFBSSxRQUFRLENBQUM7UUFDYixFQUFFLENBQUMsMENBQTBDLEVBQUM7WUFDMUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBQyxjQUFXLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUNBQXlDLEVBQUM7WUFDekMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1QkFBdUIsRUFBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHNEQUFzRCxFQUFDO1lBQ3RELFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3RzL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmltcG9ydCB0YXNrYnVmZmVyID0gcmVxdWlyZShcIi4uL2Rpc3QvaW5kZXhcIik7XG5sZXQgc2hvdWxkID0gcmVxdWlyZShcInNob3VsZFwiKTtcbmRlc2NyaWJlKFwidGFza2J1ZmZlclwiLGZ1bmN0aW9uKCl7XG4gICAgZGVzY3JpYmUoXCIudGFzaygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHRlc3RUYXNrO1xuICAgICAgICBpdChcInNob3VsZCByZXR1cm4gYSBuZXcgdGFzayB0byB2YXIgdGVzdFRhc2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGVzdFRhc2sgPSBuZXcgdGFza2J1ZmZlci5UYXNrKHt0YXNrRnVuY3Rpb246ZnVuY3Rpb24oKXt9fSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwidGVzdFRhc2sgc2hvdWxkIGJlIGFuZCBpbnN0YW5jZSBvZiBUYXNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRlc3RUYXNrLnNob3VsZC5iZS5pbnN0YW5jZW9mKHRhc2tidWZmZXIuVGFzayk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdChcInRlc3RUYXNrLmlkbGUgaXMgdHJ1ZVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoIXRlc3RUYXNrLmlkbGUpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRlc3RUYXNrLmlkbGUgaXMgbm90IHRydWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpdChcInRlc3RUYXNrLnJ1bm5pbmcgaXMgdHlwZSBib29sZWFuIGFuZCBpbml0aWFsbHkgZmFsc2VcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGVzdFRhc2sucnVubmluZy5zaG91bGQuYmUudHlwZShcImJvb2xlYW5cIik7XG4gICAgICAgICAgICB0ZXN0VGFzay5ydW5uaW5nLnNob3VsZC5iZS5mYWxzZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdfQ==
