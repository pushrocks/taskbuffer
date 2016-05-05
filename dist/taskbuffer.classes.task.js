"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var helpers = require("./taskbuffer.classes.helpers");
var Task = (function () {
    function Task(optionsArg) {
        if (!optionsArg) {
            optionsArg = { taskFunction: function () { } };
        }
        var options = optionsArg;
        this.task = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.idle = true;
        this.running = false;
        this.buffered = options.buffered;
    }
    Task.prototype.trigger = function () {
        var done = plugins.Q.defer();
        return helpers.runTask(this);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0Q0FBNEM7QUFDNUMsSUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsSUFBWSxPQUFPLFdBQU0sOEJBR3pCLENBQUMsQ0FIc0Q7QUFHdkQ7SUFZSSxjQUFZLFVBQThFO1FBQ3RGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztZQUFBLFVBQVUsR0FBRyxFQUFDLFlBQVksRUFBQyxjQUFXLENBQUMsRUFBQyxDQUFBO1FBQUEsQ0FBQztRQUMxRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxzQkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOztJQUNELDhCQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQkFBSSx1QkFBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUNELFVBQVUsUUFBZTtZQUNyQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBRSxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVFMLFdBQUM7QUFBRCxDQXhDQSxBQXdDQyxJQUFBO0FBeENZLFlBQUksT0F3Q2hCLENBQUEiLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL3Rhc2tidWZmZXIucGx1Z2luc1wiXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gXCIuL3Rhc2tidWZmZXIuY2xhc3Nlcy5oZWxwZXJzXCJcblxuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gICAgdGFzazphbnk7XG4gICAgaWRsZTpib29sZWFuO1xuICAgIHJ1bm5pbmc6Ym9vbGVhbjtcbiAgICBidWZmZXJlZDpib29sZWFuO1xuICAgIGJ1ZmZlckNvdW50ZXI6bnVtYmVyO1xuICAgIGJ1ZmZlck1heDpudW1iZXI7XG4gICAgcHJpdmF0ZSBfY291bnRlclRyaWdnZXJBYnNvbHV0ZTpudW1iZXI7XG4gICAgcHJpdmF0ZSBfc3RhdGU6c3RyaW5nO1xuICAgIHByZVRhc2s6VGFzaztcbiAgICBhZnRlclRhc2s6VGFzaztcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnNBcmc6e3Rhc2tGdW5jdGlvbjphbnkscHJlVGFzaz86VGFzayxhZnRlclRhc2s/OlRhc2ssIGJ1ZmZlcmVkPzpib29sZWFufSl7XG4gICAgICAgIGlmICghb3B0aW9uc0FyZyl7b3B0aW9uc0FyZyA9IHt0YXNrRnVuY3Rpb246ZnVuY3Rpb24oKXt9fX1cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBvcHRpb25zQXJnO1xuICAgICAgICB0aGlzLnRhc2sgPSBvcHRpb25zQXJnLnRhc2tGdW5jdGlvbjtcbiAgICAgICAgdGhpcy5wcmVUYXNrID0gb3B0aW9ucy5wcmVUYXNrO1xuICAgICAgICB0aGlzLmFmdGVyVGFzayA9IG9wdGlvbnMuYWZ0ZXJUYXNrO1xuICAgICAgICB0aGlzLmlkbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idWZmZXJlZCA9IG9wdGlvbnMuYnVmZmVyZWQ7XG4gICAgfVxuICAgIHRyaWdnZXIoKXtcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLlEuZGVmZXIoKTtcbiAgICAgICAgcmV0dXJuIGhlbHBlcnMucnVuVGFzayh0aGlzKTtcbiAgICB9O1xuICAgIHRyaWdnZXJCdWZmZXJlZCgpe1xuICAgICAgICB2YXIgZG9uZSA9IHBsdWdpbnMuUS5kZWZlcigpO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG4gICAgc2V0IHN0YXRlKHN0YXRlQXJnOnN0cmluZyl7XG4gICAgICAgIGlmIChzdGF0ZUFyZyA9PSBcImxvY2tlZFwiKXtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gXCJsb2NrZWRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwic3RhdGUgdHlwZVwiICk7XG4gICAgICAgIH1cbiAgICB9XG59Il19
