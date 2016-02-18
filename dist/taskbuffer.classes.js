#!/usr/bin/env node

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var Task = (function () {
    function Task(taskArg, optionsArg) {
        this.task = taskArg;
    }
    Task.prototype.trigger = function () {
        this.preTask.task()
            .then(this.task)
            .then(this.afterTask.task);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50cyJdLCJuYW1lcyI6WyJUYXNrIiwiVGFzay5jb25zdHJ1Y3RvciIsIlRhc2sudHJpZ2dlciIsIlRhc2sudHJpZ2dlckJ1ZmZlcmVkIiwiVGFzay5zdGF0ZSIsIlRhc2tDaGFpbiIsIlRhc2tDaGFpbi5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBNEM7QUFDNUMsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUNqRDtJQVVJQSxjQUFZQSxPQUFPQSxFQUFDQSxVQUEyQ0E7UUFDM0RDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUNERCxzQkFBT0EsR0FBUEE7UUFDSUUsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUE7YUFDZEEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7YUFDZkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBOztJQUNERiw4QkFBZUEsR0FBZkE7UUFDSUcsSUFBSUEsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRURILHNCQUFJQSx1QkFBS0E7YUFBVEE7WUFDSUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDdkJBLENBQUNBO2FBQ0RKLFVBQVVBLFFBQWVBO1lBQ3JCSSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLFFBQVFBLENBQUNBO1lBQzNCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSkEsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsWUFBWUEsQ0FBRUEsQ0FBQ0E7WUFDM0NBLENBQUNBO1FBQ0xBLENBQUNBOzs7T0FQQUo7SUFRTEEsV0FBQ0E7QUFBREEsQ0FoQ0EsQUFnQ0NBLElBQUE7QUFoQ1ksWUFBSSxPQWdDaEIsQ0FBQTtBQUVEO0lBQStCSyw2QkFBSUE7SUFDL0JBLG1CQUFZQSxZQUFtQkE7UUFDM0JDLGtCQUFNQTtZQUNGQSxJQUFJQSxFQUFDQSxjQUFXLENBQUM7U0FDcEJBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBQ0xELGdCQUFDQTtBQUFEQSxDQU5BLEFBTUNBLEVBTjhCLElBQUksRUFNbEM7QUFOWSxpQkFBUyxZQU1yQixDQUFBIiwiZmlsZSI6InRhc2tidWZmZXIuY2xhc3Nlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vdGFza2J1ZmZlci5wbHVnaW5zXCIpO1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIHRhc2s6YW55O1xuICAgIGlkbGU6Ym9vbGVhbjtcbiAgICBidWZmZXJlZDpib29sZWFuO1xuICAgIGJ1ZmZlcmVkRm9yY2VkOmJvb2xlYW47XG4gICAgcnVubmluZzpib29sZWFuO1xuICAgIHByaXZhdGUgX3N0YXRlOnN0cmluZztcbiAgICBwcmVUYXNrOlRhc2s7XG4gICAgYWZ0ZXJUYXNrOlRhc2s7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YXNrQXJnLG9wdGlvbnNBcmc/OntwcmVUYXNrPzpUYXNrLGFmdGVyVGFzaz86VGFza30pe1xuICAgICAgICB0aGlzLnRhc2sgPSB0YXNrQXJnO1xuICAgIH1cbiAgICB0cmlnZ2VyKCl7XG4gICAgICAgIHRoaXMucHJlVGFzay50YXNrKClcbiAgICAgICAgICAgIC50aGVuKHRoaXMudGFzaylcbiAgICAgICAgICAgIC50aGVuKHRoaXMuYWZ0ZXJUYXNrLnRhc2spO1xuICAgIH07XG4gICAgdHJpZ2dlckJ1ZmZlcmVkKCl7XG4gICAgICAgIHZhciBkb25lID0gcGx1Z2lucy5RLmRlZmVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cbiAgICBzZXQgc3RhdGUoc3RhdGVBcmc6c3RyaW5nKXtcbiAgICAgICAgaWYgKHN0YXRlQXJnID09IFwibG9ja2VkXCIpe1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBcImxvY2tlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJzdGF0ZSB0eXBlXCIgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhc2tDaGFpbiBleHRlbmRzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRhc2tBcnJheUFyZzpUYXNrW10pe1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICB0YXNrOmZ1bmN0aW9uKCl7fVxuICAgICAgICB9KTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
