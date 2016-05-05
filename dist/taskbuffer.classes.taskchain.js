"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var classes = require("./taskbuffer.classes");
var Taskchain = (function (_super) {
    __extends(Taskchain, _super);
    function Taskchain(taskArrayArg) {
        var _this = this;
        _super.call(this, {
            taskFunction: function () {
                if (_this.taskArray.length = 0)
                    return; //make sure there is actually a Task available to execute
                var startDeferred = plugins.Q.defer(); // this is the starting Deferred object 
                var promisePointer = startDeferred.promise;
                var _loop_1 = function(keyArg) {
                    promisePointer.then(function () {
                        promisePointer = this.taskArray[keyArg].trigger();
                        return promisePointer;
                    });
                };
                for (var keyArg in _this.taskArray) {
                    _loop_1(keyArg);
                }
                ;
                startDeferred.resolve();
            }
        });
    }
    Taskchain.prototype.addTask = function (taskArg) {
        this.taskArray.push(taskArg);
    };
    ;
    Taskchain.prototype.removeTask = function (taskArg) {
        //TODO
    };
    ;
    Taskchain.prototype.shiftTask = function () {
    };
    ;
    return Taskchain;
}(classes.Task));
exports.Taskchain = Taskchain;
;
var myTask = new Taskchain(new classes.Task({
    taskFunction: function () { }
}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsSUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFHL0M7SUFBK0IsNkJBQVk7SUFHdkMsbUJBQVksWUFBd0M7UUFIeEQsaUJBNEJDO1FBeEJPLGtCQUFNO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsQ0FBQyx5REFBeUQ7Z0JBQy9GLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQy9FLElBQUksY0FBYyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDO29CQUNJLGNBQWMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNsRCxNQUFNLENBQUMsY0FBYyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQTs7Z0JBSk4sR0FBRyxDQUFBLENBQUMsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQzs7aUJBS2hDO2dCQUFBLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMkJBQU8sR0FBUCxVQUFRLE9BQW9CO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0lBQ0QsOEJBQVUsR0FBVixVQUFXLE9BQW9CO1FBQzNCLE1BQU07SUFDVixDQUFDOztJQUNELDZCQUFTLEdBQVQ7SUFFQSxDQUFDOztJQUNMLGdCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsQ0E1QjhCLE9BQU8sQ0FBQyxJQUFJLEdBNEIxQztBQTVCWSxpQkFBUyxZQTRCckIsQ0FBQTtBQUFBLENBQUM7QUFFRixJQUFJLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FDdEIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2IsWUFBWSxFQUFDLGNBQVcsQ0FBQztDQUM1QixDQUFDLENBQ0wsQ0FBQyIsImZpbGUiOiJ0YXNrYnVmZmVyLmNsYXNzZXMudGFza2NoYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi90YXNrYnVmZmVyLnBsdWdpbnNcIjtcbmltcG9ydCAqIGFzIGNsYXNzZXMgZnJvbSBcIi4vdGFza2J1ZmZlci5jbGFzc2VzXCJcbmltcG9ydCBoZWxwZXJzID0gcmVxdWlyZShcIi4vdGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnNcIik7XG5cbmV4cG9ydCBjbGFzcyBUYXNrY2hhaW4gZXh0ZW5kcyBjbGFzc2VzLlRhc2sge1xuICAgIHRhc2tBcnJheTpjbGFzc2VzLlRhc2tbXTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcih0YXNrQXJyYXlBcmc6Y2xhc3Nlcy5UYXNrW118Y2xhc3Nlcy5UYXNrKXtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgdGFza0Z1bmN0aW9uOiAoKSA9PiB7IC8vIHRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBleGVjdXRlZCB3aGVuIFRhc2tDaGFpbiBpcyB0cmlnZ2VyZWRcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRhc2tBcnJheS5sZW5ndGggPSAwKSByZXR1cm47IC8vbWFrZSBzdXJlIHRoZXJlIGlzIGFjdHVhbGx5IGEgVGFzayBhdmFpbGFibGUgdG8gZXhlY3V0ZVxuICAgICAgICAgICAgICAgIGxldCBzdGFydERlZmVycmVkID0gcGx1Z2lucy5RLmRlZmVyKCk7IC8vIHRoaXMgaXMgdGhlIHN0YXJ0aW5nIERlZmVycmVkIG9iamVjdCBcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZVBvaW50ZXIgPSBzdGFydERlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBrZXlBcmcgaW4gdGhpcy50YXNrQXJyYXkpe1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUG9pbnRlci50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlUG9pbnRlciA9IHRoaXMudGFza0FycmF5W2tleUFyZ10udHJpZ2dlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2VQb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc3RhcnREZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRUYXNrKHRhc2tBcmc6Y2xhc3Nlcy5UYXNrKXtcbiAgICAgICAgdGhpcy50YXNrQXJyYXkucHVzaCh0YXNrQXJnKTtcbiAgICB9O1xuICAgIHJlbW92ZVRhc2sodGFza0FyZzpjbGFzc2VzLlRhc2spe1xuICAgICAgICAvL1RPRE9cbiAgICB9O1xuICAgIHNoaWZ0VGFzaygpe1xuICAgICAgICBcbiAgICB9O1xufTtcblxubGV0IG15VGFzayA9IG5ldyBUYXNrY2hhaW4oXG4gICAgbmV3IGNsYXNzZXMuVGFzayh7XG4gICAgICAgIHRhc2tGdW5jdGlvbjpmdW5jdGlvbigpe31cbiAgICB9KVxuKTsiXX0=
