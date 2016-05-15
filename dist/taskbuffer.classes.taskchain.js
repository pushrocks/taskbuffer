"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
var helpers = require("./taskbuffer.classes.helpers");
var Taskchain = (function (_super) {
    __extends(Taskchain, _super);
    function Taskchain(optionsArg) {
        var _this = this;
        var options = plugins.lodash.assign({
            name: "unnamed Taskchain",
            log: false
        }, optionsArg, {
            taskFunction: function () {
                var done = plugins.Q.defer(); // this is the starting Deferred object 
                var taskCounter = 0;
                var iterateTasks = function () {
                    if (typeof _this.taskArray[taskCounter] != "undefined") {
                        _this._oraObject.text(_this.name + " running: Task" + _this.taskArray[taskCounter].name);
                        _this.taskArray[taskCounter].trigger()
                            .then(function () {
                            _this._oraObject.log(_this.taskArray[taskCounter].name, "ok");
                            taskCounter++;
                            iterateTasks();
                        });
                    }
                    else {
                        _this._oraObject.endOk("Taskchain \"" + _this.name + "\" completed successfully");
                        done.resolve();
                    }
                };
                iterateTasks();
                return done.promise;
            }
        });
        _super.call(this, options);
        this.taskArray = optionsArg.taskArray;
        this._oraObject = new plugins.beautylog.Ora("Taskchain idle", "blue");
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
    Taskchain.prototype.trigger = function () {
        this._oraObject.start(this.name + " running...");
        return helpers.runTask(this);
    };
    return Taskchain;
}(taskbuffer_classes_task_1.Task));
exports.Taskchain = Taskchain;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsd0NBQW1CLDJCQUEyQixDQUFDLENBQUE7QUFDL0MsSUFBTyxPQUFPLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUV6RDtJQUErQiw2QkFBSTtJQUcvQixtQkFBWSxVQUlYO1FBUEwsaUJBc0RDO1FBOUNPLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUMvQjtZQUNJLElBQUksRUFBQyxtQkFBbUI7WUFDeEIsR0FBRyxFQUFDLEtBQUs7U0FDWixFQUNELFVBQVUsRUFDVjtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsd0NBQXdDO2dCQUN0RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksWUFBWSxHQUFHO29CQUNmLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO3dCQUNsRCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RGLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFOzZCQUNoQyxJQUFJLENBQUM7NEJBQ0YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzNELFdBQVcsRUFBRSxDQUFDOzRCQUNkLFlBQVksRUFBRSxDQUFDO3dCQUNuQixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsSUFBSSxHQUFJLDJCQUEyQixDQUFDLENBQUM7d0JBQ2pGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDTCxDQUFDLENBQUM7Z0JBQ0YsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQ0osQ0FBQztRQUNGLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0QsMkJBQU8sR0FBUCxVQUFRLE9BQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7SUFDRCw4QkFBVSxHQUFWLFVBQVcsT0FBWTtRQUNuQixNQUFNO0lBQ1YsQ0FBQzs7SUFDRCw2QkFBUyxHQUFUO0lBRUEsQ0FBQzs7SUFDRCwyQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXREQSxBQXNEQyxDQXREOEIsOEJBQUksR0FzRGxDO0FBdERZLGlCQUFTLFlBc0RyQixDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJ0YXNrYnVmZmVyLmNsYXNzZXMudGFza2NoYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL3Rhc2tidWZmZXIucGx1Z2luc1wiO1xyXG5pbXBvcnQge1Rhc2t9IGZyb20gXCIuL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrXCI7XHJcbmltcG9ydCBoZWxwZXJzID0gcmVxdWlyZShcIi4vdGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFza2NoYWluIGV4dGVuZHMgVGFzayB7XHJcbiAgICB0YXNrQXJyYXk6VGFza1tdO1xyXG4gICAgcHJpdmF0ZSBfb3JhT2JqZWN0OnBsdWdpbnMuYmVhdXR5bG9nLk9yYTtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnNBcmc6e1xyXG4gICAgICAgIG5hbWU/OnN0cmluZyxcclxuICAgICAgICBsb2c/OmJvb2xlYW4sXHJcbiAgICAgICAgdGFza0FycmF5OlRhc2tbXVxyXG4gICAgfSl7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBwbHVnaW5zLmxvZGFzaC5hc3NpZ24oXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6XCJ1bm5hbWVkIFRhc2tjaGFpblwiLFxyXG4gICAgICAgICAgICAgICAgbG9nOmZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wdGlvbnNBcmcsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhc2tGdW5jdGlvbjogKCkgPT4geyAvLyB0aGlzIGlzIHRoZSBmdW5jdGlvbiB0aGF0IGdldHMgZXhlY3V0ZWQgd2hlbiBUYXNrQ2hhaW4gaXMgdHJpZ2dlcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLlEuZGVmZXIoKTsgLy8gdGhpcyBpcyB0aGUgc3RhcnRpbmcgRGVmZXJyZWQgb2JqZWN0IFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXNrQ291bnRlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZXJhdGVUYXNrcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMudGFza0FycmF5W3Rhc2tDb3VudGVyXSAhPSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yYU9iamVjdC50ZXh0KHRoaXMubmFtZSArIFwiIHJ1bm5pbmc6IFRhc2tcIiArIHRoaXMudGFza0FycmF5W3Rhc2tDb3VudGVyXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFza0FycmF5W3Rhc2tDb3VudGVyXS50cmlnZ2VyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmFPYmplY3QubG9nKHRoaXMudGFza0FycmF5W3Rhc2tDb3VudGVyXS5uYW1lLFwib2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVUYXNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmFPYmplY3QuZW5kT2soXCJUYXNrY2hhaW4gXFxcIlwiICsgdGhpcy5uYW1lICsgIFwiXFxcIiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVUYXNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMudGFza0FycmF5ID0gb3B0aW9uc0FyZy50YXNrQXJyYXk7XHJcbiAgICAgICAgdGhpcy5fb3JhT2JqZWN0ID0gbmV3IHBsdWdpbnMuYmVhdXR5bG9nLk9yYShcIlRhc2tjaGFpbiBpZGxlXCIsXCJibHVlXCIpO1xyXG4gICAgfVxyXG4gICAgYWRkVGFzayh0YXNrQXJnOlRhc2spe1xyXG4gICAgICAgIHRoaXMudGFza0FycmF5LnB1c2godGFza0FyZyk7XHJcbiAgICB9O1xyXG4gICAgcmVtb3ZlVGFzayh0YXNrQXJnOlRhc2spe1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfTtcclxuICAgIHNoaWZ0VGFzaygpe1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIHRyaWdnZXIoKXtcclxuICAgICAgICB0aGlzLl9vcmFPYmplY3Quc3RhcnQodGhpcy5uYW1lICsgXCIgcnVubmluZy4uLlwiKTtcclxuICAgICAgICByZXR1cm4gaGVscGVycy5ydW5UYXNrKHRoaXMpO1xyXG4gICAgfVxyXG59OyJdfQ==
