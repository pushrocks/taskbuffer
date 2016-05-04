"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var helpers = require("./taskbuffer.classes.helpers");
var Task = (function () {
    function Task(taskArg, optionsArg) {
        if (optionsArg === void 0) { optionsArg = {}; }
        var options = optionsArg;
        this.task = taskArg;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.idle = true;
        this.running = false;
        if (typeof options.buffered === "boolean") {
            this.buffered = options.buffered;
        }
        else {
            this.buffered = false;
        }
    }
    Task.prototype.trigger = function () {
        var done = plugins.Q.defer();
        helpers.runTask(this.preTask)
            .then(function () {
        })
            .then(function () {
        })
            .then(function () {
            done.resolve();
        });
        return done.promise;
    };
    ;
    Task.prototype.triggerBuffered = function () {
        var done = plugins.Q.defer();
    };
    Object.defineProperty(Task.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (stateArg) {
            if (stateArg == "locked") {
                this._state = "locked";
            }
            else {
                plugins.beautylog.error("state type");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Task;
}());
exports.Task = Task;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0Q0FBNEM7QUFDNUMsSUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsSUFBWSxPQUFPLFdBQU0sOEJBRXpCLENBQUMsQ0FGc0Q7QUFFdkQ7SUFXSSxjQUFZLE9BQU8sRUFBQyxVQUFrRTtRQUFsRSwwQkFBa0UsR0FBbEUsZUFBa0U7UUFDbEYsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3JDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBQ0Qsc0JBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3hCLElBQUksQ0FBQztRQUVOLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQztRQUVOLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLENBQUM7O0lBQ0QsOEJBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFJLHVCQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBQ0QsVUFBVSxRQUFlO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFFLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBUUwsV0FBQztBQUFELENBcERBLEFBb0RDLElBQUE7QUFwRFksWUFBSSxPQW9EaEIsQ0FBQSIsImZpbGUiOiJ0YXNrYnVmZmVyLmNsYXNzZXMudGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vdGFza2J1ZmZlci5wbHVnaW5zXCJcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSBcIi4vdGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnNcIlxuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gICAgdGFzazphbnk7XG4gICAgaWRsZTpib29sZWFuO1xuICAgIHJ1bm5pbmc6Ym9vbGVhbjtcbiAgICBidWZmZXJlZDpib29sZWFuO1xuICAgIHByaXZhdGUgX2NvdW50ZXJCdWZmZXJSZWxhdGl2ZTtcbiAgICBwcml2YXRlIF9jb3VudGVyVHJpZ2dlckFic29sdXRlO1xuICAgIHByaXZhdGUgX3N0YXRlOnN0cmluZztcbiAgICBwcmVUYXNrOlRhc2s7XG4gICAgYWZ0ZXJUYXNrOlRhc2s7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YXNrQXJnLG9wdGlvbnNBcmc6e3ByZVRhc2s/OlRhc2ssYWZ0ZXJUYXNrPzpUYXNrLCBidWZmZXJlZD86Ym9vbGVhbn0gPSB7fSl7XG4gICAgICAgIHZhciBvcHRpb25zID0gb3B0aW9uc0FyZztcbiAgICAgICAgdGhpcy50YXNrID0gdGFza0FyZztcbiAgICAgICAgdGhpcy5wcmVUYXNrID0gb3B0aW9ucy5wcmVUYXNrO1xuICAgICAgICB0aGlzLmFmdGVyVGFzayA9IG9wdGlvbnMuYWZ0ZXJUYXNrO1xuICAgICAgICB0aGlzLmlkbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmJ1ZmZlcmVkID09PSBcImJvb2xlYW5cIil7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcmVkID0gb3B0aW9ucy5idWZmZXJlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cmlnZ2VyKCl7XG4gICAgICAgIGxldCBkb25lID0gcGx1Z2lucy5RLmRlZmVyKCk7XG4gICAgICAgIGhlbHBlcnMucnVuVGFzayh0aGlzLnByZVRhc2spXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZG9uZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xuICAgIH07XG4gICAgdHJpZ2dlckJ1ZmZlcmVkKCl7XG4gICAgICAgIHZhciBkb25lID0gcGx1Z2lucy5RLmRlZmVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cbiAgICBzZXQgc3RhdGUoc3RhdGVBcmc6c3RyaW5nKXtcbiAgICAgICAgaWYgKHN0YXRlQXJnID09IFwibG9ja2VkXCIpe1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBcImxvY2tlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJzdGF0ZSB0eXBlXCIgKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=
