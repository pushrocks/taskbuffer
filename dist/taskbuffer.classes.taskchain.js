"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var taskbuffer_classes_1 = require("./taskbuffer.classes");
var helpers = require("./taskbuffer.classes.helpers");
var Taskchain = (function (_super) {
    __extends(Taskchain, _super);
    function Taskchain(optionsArg) {
        var _this = this;
        var options = plugins.lodash.assign({
            name: "unnamed Task",
            log: false
        }, optionsArg, {
            taskFunction: function () {
                console.log("running taskchain function");
                var done = plugins.Q.defer(); // this is the starting Deferred object 
                var taskCounter = 0;
                var iterateTasks = function () {
                    if (typeof _this.taskArray[taskCounter] != "undefined") {
                        _this.taskArray[taskCounter].trigger()
                            .then(function () {
                            taskCounter++;
                            iterateTasks();
                        });
                    }
                    else {
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
}(taskbuffer_classes_1.Task));
exports.Taskchain = Taskchain;
;
var myTask = new Taskchain({
    taskArray: [
        new taskbuffer_classes_1.Task({
            taskFunction: function () { }
        })
    ]
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsbUNBQW1CLHNCQUFzQixDQUFDLENBQUE7QUFDMUMsSUFBTyxPQUFPLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUV6RDtJQUErQiw2QkFBSTtJQUcvQixtQkFBWSxVQUlYO1FBUEwsaUJBb0RDO1FBNUNPLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUMvQjtZQUNJLElBQUksRUFBQyxjQUFjO1lBQ25CLEdBQUcsRUFBQyxLQUFLO1NBQ1osRUFDRCxVQUFVLEVBQ1Y7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsd0NBQXdDO2dCQUN0RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksWUFBWSxHQUFHO29CQUNmLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO3dCQUNsRCxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRTs2QkFDaEMsSUFBSSxDQUFDOzRCQUNGLFdBQVcsRUFBRSxDQUFDOzRCQUNkLFlBQVksRUFBRSxDQUFDO3dCQUNuQixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDTCxDQUFDLENBQUM7Z0JBQ0YsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQ0osQ0FBQztRQUNGLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0QsMkJBQU8sR0FBUCxVQUFRLE9BQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7SUFDRCw4QkFBVSxHQUFWLFVBQVcsT0FBWTtRQUNuQixNQUFNO0lBQ1YsQ0FBQzs7SUFDRCw2QkFBUyxHQUFUO0lBRUEsQ0FBQzs7SUFDRCwyQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXBEQSxBQW9EQyxDQXBEOEIseUJBQUksR0FvRGxDO0FBcERZLGlCQUFTLFlBb0RyQixDQUFBO0FBQUEsQ0FBQztBQUVGLElBQUksTUFBTSxHQUFHLElBQUksU0FBUyxDQUN0QjtJQUNJLFNBQVMsRUFBRTtRQUNQLElBQUkseUJBQUksQ0FBQztZQUNMLFlBQVksRUFBQyxjQUFXLENBQUM7U0FDNUIsQ0FBQztLQUNMO0NBQ0osQ0FDSixDQUFDIiwiZmlsZSI6InRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XHJcbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vdGFza2J1ZmZlci5wbHVnaW5zXCI7XHJcbmltcG9ydCB7VGFza30gZnJvbSBcIi4vdGFza2J1ZmZlci5jbGFzc2VzXCI7XHJcbmltcG9ydCBoZWxwZXJzID0gcmVxdWlyZShcIi4vdGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFza2NoYWluIGV4dGVuZHMgVGFzayB7XHJcbiAgICB0YXNrQXJyYXk6VGFza1tdO1xyXG4gICAgcHJpdmF0ZSBfb3JhT2JqZWN0O1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uc0FyZzp7XHJcbiAgICAgICAgbmFtZT86c3RyaW5nLFxyXG4gICAgICAgIGxvZz86Ym9vbGVhbixcclxuICAgICAgICB0YXNrQXJyYXk6VGFza1tdXHJcbiAgICB9KXtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHBsdWdpbnMubG9kYXNoLmFzc2lnbihcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcInVubmFtZWQgVGFza1wiLFxyXG4gICAgICAgICAgICAgICAgbG9nOmZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9wdGlvbnNBcmcsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhc2tGdW5jdGlvbjogKCkgPT4geyAvLyB0aGlzIGlzIHRoZSBmdW5jdGlvbiB0aGF0IGdldHMgZXhlY3V0ZWQgd2hlbiBUYXNrQ2hhaW4gaXMgdHJpZ2dlcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nIHRhc2tjaGFpbiBmdW5jdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZG9uZSA9IHBsdWdpbnMuUS5kZWZlcigpOyAvLyB0aGlzIGlzIHRoZSBzdGFydGluZyBEZWZlcnJlZCBvYmplY3QgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlcmF0ZVRhc2tzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgdGhpcy50YXNrQXJyYXlbdGFza0NvdW50ZXJdICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrQXJyYXlbdGFza0NvdW50ZXJdLnRyaWdnZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVUYXNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZVRhc2tzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy50YXNrQXJyYXkgPSBvcHRpb25zQXJnLnRhc2tBcnJheTtcclxuICAgICAgICB0aGlzLl9vcmFPYmplY3QgPSBuZXcgcGx1Z2lucy5iZWF1dHlsb2cuT3JhKFwiVGFza2NoYWluIGlkbGVcIixcImJsdWVcIik7XHJcbiAgICB9XHJcbiAgICBhZGRUYXNrKHRhc2tBcmc6VGFzayl7XHJcbiAgICAgICAgdGhpcy50YXNrQXJyYXkucHVzaCh0YXNrQXJnKTtcclxuICAgIH07XHJcbiAgICByZW1vdmVUYXNrKHRhc2tBcmc6VGFzayl7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9O1xyXG4gICAgc2hpZnRUYXNrKCl7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgdHJpZ2dlcigpe1xyXG4gICAgICAgIHRoaXMuX29yYU9iamVjdC5zdGFydCh0aGlzLm5hbWUgKyBcIiBydW5uaW5nLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWxwZXJzLnJ1blRhc2sodGhpcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5sZXQgbXlUYXNrID0gbmV3IFRhc2tjaGFpbihcclxuICAgIHtcclxuICAgICAgICB0YXNrQXJyYXk6IFtcclxuICAgICAgICAgICAgbmV3IFRhc2soe1xyXG4gICAgICAgICAgICAgICAgdGFza0Z1bmN0aW9uOmZ1bmN0aW9uKCl7fVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuKTsiXX0=
