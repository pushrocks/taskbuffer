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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0Q0FBNEM7QUFDNUMsSUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsSUFBWSxPQUFPLFdBQU0sOEJBRXpCLENBQUMsQ0FGc0Q7QUFFdkQ7SUFZSSxjQUFZLE9BQU8sRUFBQyxVQUFrRTtRQUFsRSwwQkFBa0UsR0FBbEUsZUFBa0U7UUFDbEYsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3JDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBQ0Qsc0JBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3hCLElBQUksQ0FBQztRQUVOLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQztRQUVOLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLENBQUM7O0lBQ0QsOEJBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFJLHVCQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBQ0QsVUFBVSxRQUFlO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFFLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBUUwsV0FBQztBQUFELENBckRBLEFBcURDLElBQUE7QUFyRFksWUFBSSxPQXFEaEIsQ0FBQSIsImZpbGUiOiJ0YXNrYnVmZmVyLmNsYXNzZXMudGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vdGFza2J1ZmZlci5wbHVnaW5zXCJcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSBcIi4vdGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnNcIlxuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gICAgdGFzazphbnk7XG4gICAgaWRsZTpib29sZWFuO1xuICAgIHJ1bm5pbmc6Ym9vbGVhbjtcbiAgICBidWZmZXJlZDpib29sZWFuO1xuICAgIGJ1ZmZlckNvdW50ZXI6bnVtYmVyO1xuICAgIGJ1ZmZlck1heDpudW1iZXI7XG4gICAgcHJpdmF0ZSBfY291bnRlclRyaWdnZXJBYnNvbHV0ZTpudW1iZXI7XG4gICAgcHJpdmF0ZSBfc3RhdGU6c3RyaW5nO1xuICAgIHByZVRhc2s6VGFzaztcbiAgICBhZnRlclRhc2s6VGFzaztcblxuICAgIGNvbnN0cnVjdG9yKHRhc2tBcmcsb3B0aW9uc0FyZzp7cHJlVGFzaz86VGFzayxhZnRlclRhc2s/OlRhc2ssIGJ1ZmZlcmVkPzpib29sZWFufSA9IHt9KXtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBvcHRpb25zQXJnO1xuICAgICAgICB0aGlzLnRhc2sgPSB0YXNrQXJnO1xuICAgICAgICB0aGlzLnByZVRhc2sgPSBvcHRpb25zLnByZVRhc2s7XG4gICAgICAgIHRoaXMuYWZ0ZXJUYXNrID0gb3B0aW9ucy5hZnRlclRhc2s7XG4gICAgICAgIHRoaXMuaWRsZSA9IHRydWU7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYnVmZmVyZWQgPT09IFwiYm9vbGVhblwiKXtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyZWQgPSBvcHRpb25zLmJ1ZmZlcmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5idWZmZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRyaWdnZXIoKXtcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLlEuZGVmZXIoKTtcbiAgICAgICAgaGVscGVycy5ydW5UYXNrKHRoaXMucHJlVGFzaylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XG4gICAgfTtcbiAgICB0cmlnZ2VyQnVmZmVyZWQoKXtcbiAgICAgICAgdmFyIGRvbmUgPSBwbHVnaW5zLlEuZGVmZXIoKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuICAgIHNldCBzdGF0ZShzdGF0ZUFyZzpzdHJpbmcpe1xuICAgICAgICBpZiAoc3RhdGVBcmcgPT0gXCJsb2NrZWRcIil7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFwibG9ja2VkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcInN0YXRlIHR5cGVcIiApO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
