"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
var Taskparallel = (function (_super) {
    __extends(Taskparallel, _super);
    function Taskparallel(optionsArg) {
        var _this = this;
        var options = plugins.lodash.assign(optionsArg, {
            taskFunction: function () {
                var done = plugins.Q.defer();
                var promiseArray; // stores promises of all tasks, since they run in parallel
                _this.taskArray.forEach(function (taskArg) {
                    promiseArray.push(taskArg.trigger());
                });
                plugins.Q.all(promiseArray)
                    .then(done.resolve);
                return done.promise;
            }
        });
        _super.call(this, options);
    }
    return Taskparallel;
}(taskbuffer_classes_task_1.Task));
exports.Taskparallel = Taskparallel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrcGFyYWxsZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUN6QixDQUFDLENBRDhDO0FBRS9DLHdDQUFtQiwyQkFFbkIsQ0FBQyxDQUY2QztBQUU5QztJQUFrQyxnQ0FBSTtJQUVsQyxzQkFBWSxVQUVYO1FBSkwsaUJBc0JDO1FBakJPLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUMvQixVQUFVLEVBQ1Y7WUFDSSxZQUFZLEVBQUM7Z0JBQ1QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxZQUFZLENBQUMsQ0FBQywyREFBMkQ7Z0JBQzdFLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBWTtvQkFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO3FCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FDSixDQUFBO1FBQ0Qsa0JBQU0sT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QmlDLDhCQUFJLEdBc0JyQztBQXRCWSxvQkFBWSxlQXNCeEIsQ0FBQSIsImZpbGUiOiJ0YXNrYnVmZmVyLmNsYXNzZXMudGFza3BhcmFsbGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL3Rhc2tidWZmZXIucGx1Z2luc1wiXHJcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSBcIi4vdGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnNcIlxyXG5pbXBvcnQge1Rhc2t9IGZyb20gXCIuL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBUYXNrcGFyYWxsZWwgZXh0ZW5kcyBUYXNrIHtcclxuICAgIHRhc2tBcnJheTpUYXNrW107XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zQXJnOntcclxuICAgICAgICB0YXNrQXJyYXk6VGFza1tdXHJcbiAgICB9KXtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHBsdWdpbnMubG9kYXNoLmFzc2lnbihcclxuICAgICAgICAgICAgb3B0aW9uc0FyZyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFza0Z1bmN0aW9uOigpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMuUS5kZWZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlQXJyYXk7IC8vIHN0b3JlcyBwcm9taXNlcyBvZiBhbGwgdGFza3MsIHNpbmNlIHRoZXkgcnVuIGluIHBhcmFsbGVsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrQXJyYXkuZm9yRWFjaChmdW5jdGlvbih0YXNrQXJnOlRhc2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlQXJyYXkucHVzaCh0YXNrQXJnLnRyaWdnZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5zLlEuYWxsKHByb21pc2VBcnJheSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZG9uZS5yZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
