"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var taskbuffer_classes_1 = require("./taskbuffer.classes");
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
}(taskbuffer_classes_1.Task));
exports.Taskchain = Taskchain;
;
var myTask = new Taskchain(new taskbuffer_classes_1.Task({
    taskFunction: function () { }
}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsbUNBQW1CLHNCQUFzQixDQUFDLENBQUE7QUFHMUM7SUFBK0IsNkJBQUk7SUFHL0IsbUJBQVksWUFBd0I7UUFIeEMsaUJBNEJDO1FBeEJPLGtCQUFNO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsQ0FBQyx5REFBeUQ7Z0JBQy9GLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQy9FLElBQUksY0FBYyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDO29CQUNJLGNBQWMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNsRCxNQUFNLENBQUMsY0FBYyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQTs7Z0JBSk4sR0FBRyxDQUFBLENBQUMsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQzs7aUJBS2hDO2dCQUFBLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMkJBQU8sR0FBUCxVQUFRLE9BQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7SUFDRCw4QkFBVSxHQUFWLFVBQVcsT0FBWTtRQUNuQixNQUFNO0lBQ1YsQ0FBQzs7SUFDRCw2QkFBUyxHQUFUO0lBRUEsQ0FBQzs7SUFDTCxnQkFBQztBQUFELENBNUJBLEFBNEJDLENBNUI4Qix5QkFBSSxHQTRCbEM7QUE1QlksaUJBQVMsWUE0QnJCLENBQUE7QUFBQSxDQUFDO0FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQ3RCLElBQUkseUJBQUksQ0FBQztJQUNMLFlBQVksRUFBQyxjQUFXLENBQUM7Q0FDNUIsQ0FBQyxDQUNMLENBQUMiLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vdGFza2J1ZmZlci5wbHVnaW5zXCI7XG5pbXBvcnQge1Rhc2t9IGZyb20gXCIuL3Rhc2tidWZmZXIuY2xhc3Nlc1wiO1xuaW1wb3J0IGhlbHBlcnMgPSByZXF1aXJlKFwiLi90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVyc1wiKTtcblxuZXhwb3J0IGNsYXNzIFRhc2tjaGFpbiBleHRlbmRzIFRhc2sge1xuICAgIHRhc2tBcnJheTpUYXNrW107XG4gICAgXG4gICAgY29uc3RydWN0b3IodGFza0FycmF5QXJnOlRhc2tbXXxUYXNrKXtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgdGFza0Z1bmN0aW9uOiAoKSA9PiB7IC8vIHRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBleGVjdXRlZCB3aGVuIFRhc2tDaGFpbiBpcyB0cmlnZ2VyZWRcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRhc2tBcnJheS5sZW5ndGggPSAwKSByZXR1cm47IC8vbWFrZSBzdXJlIHRoZXJlIGlzIGFjdHVhbGx5IGEgVGFzayBhdmFpbGFibGUgdG8gZXhlY3V0ZVxuICAgICAgICAgICAgICAgIGxldCBzdGFydERlZmVycmVkID0gcGx1Z2lucy5RLmRlZmVyKCk7IC8vIHRoaXMgaXMgdGhlIHN0YXJ0aW5nIERlZmVycmVkIG9iamVjdCBcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZVBvaW50ZXIgPSBzdGFydERlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBrZXlBcmcgaW4gdGhpcy50YXNrQXJyYXkpe1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUG9pbnRlci50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlUG9pbnRlciA9IHRoaXMudGFza0FycmF5W2tleUFyZ10udHJpZ2dlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2VQb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc3RhcnREZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRUYXNrKHRhc2tBcmc6VGFzayl7XG4gICAgICAgIHRoaXMudGFza0FycmF5LnB1c2godGFza0FyZyk7XG4gICAgfTtcbiAgICByZW1vdmVUYXNrKHRhc2tBcmc6VGFzayl7XG4gICAgICAgIC8vVE9ET1xuICAgIH07XG4gICAgc2hpZnRUYXNrKCl7XG4gICAgICAgIFxuICAgIH07XG59O1xuXG5sZXQgbXlUYXNrID0gbmV3IFRhc2tjaGFpbihcbiAgICBuZXcgVGFzayh7XG4gICAgICAgIHRhc2tGdW5jdGlvbjpmdW5jdGlvbigpe31cbiAgICB9KVxuKTsiXX0=
