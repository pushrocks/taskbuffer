var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        helpers.runTask(this.preTask)
            .then(function () {
        })
            .then(function () {
        });
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
})();
exports.Task = Task;
var TaskChain = (function (_super) {
    __extends(TaskChain, _super);
    function TaskChain(taskArrayArg) {
        _super.call(this, {
            task: function () { }
        });
    }
    return TaskChain;
})(Task);
exports.TaskChain = TaskChain;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50cyJdLCJuYW1lcyI6WyJUYXNrIiwiVGFzay5jb25zdHJ1Y3RvciIsIlRhc2sudHJpZ2dlciIsIlRhc2sudHJpZ2dlckJ1ZmZlcmVkIiwiVGFzay5zdGF0ZSIsIlRhc2tDaGFpbiIsIlRhc2tDaGFpbi5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBNEM7QUFDNUMsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCxJQUFPLE9BQU8sV0FBVyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pEO0lBV0lBLGNBQVlBLE9BQU9BLEVBQUNBLFVBQWtFQTtRQUFsRUMsMEJBQWtFQSxHQUFsRUEsZUFBa0VBO1FBQ2xGQSxJQUFJQSxPQUFPQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUNuQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3JCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxPQUFPQSxDQUFDQSxRQUFRQSxLQUFLQSxTQUFTQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDckNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ0pBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzFCQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUNERCxzQkFBT0EsR0FBUEE7UUFDSUUsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7YUFDeEJBLElBQUlBLENBQUNBO1FBRU4sQ0FBQyxDQUFDQTthQUNEQSxJQUFJQSxDQUFDQTtRQUVOLENBQUMsQ0FBQ0EsQ0FBQUE7SUFDVkEsQ0FBQ0E7O0lBQ0RGLDhCQUFlQSxHQUFmQTtRQUNJRyxJQUFJQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREgsc0JBQUlBLHVCQUFLQTthQUFUQTtZQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7YUFDREosVUFBVUEsUUFBZUE7WUFDckJJLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLFFBQVFBLENBQUNBLENBQUFBLENBQUNBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsUUFBUUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFFQSxDQUFDQTtZQUMzQ0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7OztPQVBBSjtJQVFMQSxXQUFDQTtBQUFEQSxDQS9DQSxBQStDQ0EsSUFBQTtBQS9DWSxZQUFJLE9BK0NoQixDQUFBO0FBR0Q7SUFBK0JLLDZCQUFJQTtJQUMvQkEsbUJBQVlBLFlBQW1CQTtRQUMzQkMsa0JBQU1BO1lBQ0ZBLElBQUlBLEVBQUNBLGNBQVcsQ0FBQztTQUNwQkEsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFDTEQsZ0JBQUNBO0FBQURBLENBTkEsQUFNQ0EsRUFOOEIsSUFBSSxFQU1sQztBQU5ZLGlCQUFTLFlBTXJCLENBQUEiLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxuaW1wb3J0IHBsdWdpbnMgPSByZXF1aXJlKFwiLi90YXNrYnVmZmVyLnBsdWdpbnNcIik7XG5pbXBvcnQgaGVscGVycyA9IHJlcXVpcmUoXCIuL3Rhc2tidWZmZXIuY2xhc3Nlcy5oZWxwZXJzXCIpO1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIHRhc2s6YW55O1xuICAgIGlkbGU6Ym9vbGVhbjtcbiAgICBydW5uaW5nOmJvb2xlYW47XG4gICAgYnVmZmVyZWQ6Ym9vbGVhbjtcbiAgICBwcml2YXRlIF9jb3VudGVyQnVmZmVyUmVsYXRpdmU7XG4gICAgcHJpdmF0ZSBfY291bnRlclRyaWdnZXJBYnNvbHV0ZTtcbiAgICBwcml2YXRlIF9zdGF0ZTpzdHJpbmc7XG4gICAgcHJlVGFzazpUYXNrO1xuICAgIGFmdGVyVGFzazpUYXNrO1xuXG4gICAgY29uc3RydWN0b3IodGFza0FyZyxvcHRpb25zQXJnOntwcmVUYXNrPzpUYXNrLGFmdGVyVGFzaz86VGFzaywgYnVmZmVyZWQ/OmJvb2xlYW59ID0ge30pe1xuICAgICAgICB2YXIgb3B0aW9ucyA9IG9wdGlvbnNBcmc7XG4gICAgICAgIHRoaXMudGFzayA9IHRhc2tBcmc7XG4gICAgICAgIHRoaXMucHJlVGFzayA9IG9wdGlvbnMucHJlVGFzaztcbiAgICAgICAgdGhpcy5hZnRlclRhc2sgPSBvcHRpb25zLmFmdGVyVGFzaztcbiAgICAgICAgdGhpcy5pZGxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5idWZmZXJlZCA9PT0gXCJib29sZWFuXCIpe1xuICAgICAgICAgICAgdGhpcy5idWZmZXJlZCA9IG9wdGlvbnMuYnVmZmVyZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJpZ2dlcigpe1xuICAgICAgICBoZWxwZXJzLnJ1blRhc2sodGhpcy5wcmVUYXNrKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIH0pXG4gICAgfTtcbiAgICB0cmlnZ2VyQnVmZmVyZWQoKXtcbiAgICAgICAgdmFyIGRvbmUgPSBwbHVnaW5zLlEuZGVmZXIoKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuICAgIHNldCBzdGF0ZShzdGF0ZUFyZzpzdHJpbmcpe1xuICAgICAgICBpZiAoc3RhdGVBcmcgPT0gXCJsb2NrZWRcIil7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFwibG9ja2VkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcInN0YXRlIHR5cGVcIiApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBUYXNrQ2hhaW4gZXh0ZW5kcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrQXJyYXlBcmc6VGFza1tdKXtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgdGFzazpmdW5jdGlvbigpe31cbiAgICAgICAgfSk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
