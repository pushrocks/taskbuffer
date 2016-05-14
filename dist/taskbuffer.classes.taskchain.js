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
        this._oraObject = plugins.beautylog.ora("Taskchain idle", "blue");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsbUNBQW1CLHNCQUFzQixDQUFDLENBQUE7QUFHMUM7SUFBK0IsNkJBQUk7SUFHL0IsbUJBQVksWUFBd0I7UUFIeEMsaUJBNkJDO1FBekJPLGtCQUFNO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsQ0FBQyx5REFBeUQ7Z0JBQy9GLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQy9FLElBQUksY0FBYyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDO29CQUNJLGNBQWMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNsRCxNQUFNLENBQUMsY0FBYyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQTs7Z0JBSk4sR0FBRyxDQUFBLENBQUMsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQzs7aUJBS2hDO2dCQUFBLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCwyQkFBTyxHQUFQLFVBQVEsT0FBWTtRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDOztJQUNELDhCQUFVLEdBQVYsVUFBVyxPQUFZO1FBQ25CLE1BQU07SUFDVixDQUFDOztJQUNELDZCQUFTLEdBQVQ7SUFFQSxDQUFDOztJQUNMLGdCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsQ0E3QjhCLHlCQUFJLEdBNkJsQztBQTdCWSxpQkFBUyxZQTZCckIsQ0FBQTtBQUFBLENBQUM7QUFFRixJQUFJLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FDdEIsSUFBSSx5QkFBSSxDQUFDO0lBQ0wsWUFBWSxFQUFDLGNBQVcsQ0FBQztDQUM1QixDQUFDLENBQ0wsQ0FBQyIsImZpbGUiOiJ0YXNrYnVmZmVyLmNsYXNzZXMudGFza2NoYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL3Rhc2tidWZmZXIucGx1Z2luc1wiO1xyXG5pbXBvcnQge1Rhc2t9IGZyb20gXCIuL3Rhc2tidWZmZXIuY2xhc3Nlc1wiO1xyXG5pbXBvcnQgaGVscGVycyA9IHJlcXVpcmUoXCIuL3Rhc2tidWZmZXIuY2xhc3Nlcy5oZWxwZXJzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhc2tjaGFpbiBleHRlbmRzIFRhc2sge1xyXG4gICAgdGFza0FycmF5OlRhc2tbXTtcclxuICAgIHByaXZhdGUgX29yYU9iamVjdDtcclxuICAgIGNvbnN0cnVjdG9yKHRhc2tBcnJheUFyZzpUYXNrW118VGFzayl7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICB0YXNrRnVuY3Rpb246ICgpID0+IHsgLy8gdGhpcyBpcyB0aGUgZnVuY3Rpb24gdGhhdCBnZXRzIGV4ZWN1dGVkIHdoZW4gVGFza0NoYWluIGlzIHRyaWdnZXJlZFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50YXNrQXJyYXkubGVuZ3RoID0gMCkgcmV0dXJuOyAvL21ha2Ugc3VyZSB0aGVyZSBpcyBhY3R1YWxseSBhIFRhc2sgYXZhaWxhYmxlIHRvIGV4ZWN1dGVcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydERlZmVycmVkID0gcGx1Z2lucy5RLmRlZmVyKCk7IC8vIHRoaXMgaXMgdGhlIHN0YXJ0aW5nIERlZmVycmVkIG9iamVjdCBcclxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlUG9pbnRlciA9IHN0YXJ0RGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5QXJnIGluIHRoaXMudGFza0FycmF5KXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUG9pbnRlci50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VQb2ludGVyID0gdGhpcy50YXNrQXJyYXlba2V5QXJnXS50cmlnZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlUG9pbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0RGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fb3JhT2JqZWN0ID0gcGx1Z2lucy5iZWF1dHlsb2cub3JhKFwiVGFza2NoYWluIGlkbGVcIixcImJsdWVcIik7XHJcbiAgICB9XHJcbiAgICBhZGRUYXNrKHRhc2tBcmc6VGFzayl7XHJcbiAgICAgICAgdGhpcy50YXNrQXJyYXkucHVzaCh0YXNrQXJnKTtcclxuICAgIH07XHJcbiAgICByZW1vdmVUYXNrKHRhc2tBcmc6VGFzayl7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9O1xyXG4gICAgc2hpZnRUYXNrKCl7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG59O1xyXG5cclxubGV0IG15VGFzayA9IG5ldyBUYXNrY2hhaW4oXHJcbiAgICBuZXcgVGFzayh7XHJcbiAgICAgICAgdGFza0Z1bmN0aW9uOmZ1bmN0aW9uKCl7fVxyXG4gICAgfSlcclxuKTsiXX0=
