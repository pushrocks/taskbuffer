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
    function Taskchain(optionsArg) {
        var _this = this;
        var options = plugins.lodash.assign(optionsArg, {
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
        _super.call(this, options);
        this.taskArray = optionsArg.taskArray;
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
    Taskchain.prototype.trigger = function () {
        this._oraObject.start(this.name + "running");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsbUNBQW1CLHNCQUFzQixDQUFDLENBQUE7QUFHMUM7SUFBK0IsNkJBQUk7SUFHL0IsbUJBQVksVUFHWDtRQU5MLGlCQXFDQztRQTlCTyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUM7WUFDM0MsWUFBWSxFQUFFO2dCQUNWLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsQ0FBQyx5REFBeUQ7Z0JBQy9GLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQy9FLElBQUksY0FBYyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDO29CQUNJLGNBQWMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNsRCxNQUFNLENBQUMsY0FBYyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQTs7Z0JBSk4sR0FBRyxDQUFBLENBQUMsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQzs7aUJBS2hDO2dCQUFBLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxrQkFBTSxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCwyQkFBTyxHQUFQLFVBQVEsT0FBWTtRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDOztJQUNELDhCQUFVLEdBQVYsVUFBVyxPQUFZO1FBQ25CLE1BQU07SUFDVixDQUFDOztJQUNELDZCQUFTLEdBQVQ7SUFFQSxDQUFDOztJQUNELDJCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDTCxnQkFBQztBQUFELENBckNBLEFBcUNDLENBckM4Qix5QkFBSSxHQXFDbEM7QUFyQ1ksaUJBQVMsWUFxQ3JCLENBQUE7QUFBQSxDQUFDO0FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQ3RCO0lBQ0ksU0FBUyxFQUFFO1FBQ1AsSUFBSSx5QkFBSSxDQUFDO1lBQ0wsWUFBWSxFQUFDLGNBQVcsQ0FBQztTQUM1QixDQUFDO0tBQ0w7Q0FDSixDQUNKLENBQUMiLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cclxuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi90YXNrYnVmZmVyLnBsdWdpbnNcIjtcclxuaW1wb3J0IHtUYXNrfSBmcm9tIFwiLi90YXNrYnVmZmVyLmNsYXNzZXNcIjtcclxuaW1wb3J0IGhlbHBlcnMgPSByZXF1aXJlKFwiLi90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVyc1wiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYXNrY2hhaW4gZXh0ZW5kcyBUYXNrIHtcclxuICAgIHRhc2tBcnJheTpUYXNrW107XHJcbiAgICBwcml2YXRlIF9vcmFPYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zQXJnOntcclxuICAgICAgICB0YXNrQXJyYXk6VGFza1tdXHJcbiAgICAgICAgbmFtZT86c3RyaW5nXHJcbiAgICB9KXtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHBsdWdpbnMubG9kYXNoLmFzc2lnbihvcHRpb25zQXJnLHtcclxuICAgICAgICAgICAgdGFza0Z1bmN0aW9uOiAoKSA9PiB7IC8vIHRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBleGVjdXRlZCB3aGVuIFRhc2tDaGFpbiBpcyB0cmlnZ2VyZWRcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudGFza0FycmF5Lmxlbmd0aCA9IDApIHJldHVybjsgLy9tYWtlIHN1cmUgdGhlcmUgaXMgYWN0dWFsbHkgYSBUYXNrIGF2YWlsYWJsZSB0byBleGVjdXRlXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREZWZlcnJlZCA9IHBsdWdpbnMuUS5kZWZlcigpOyAvLyB0aGlzIGlzIHRoZSBzdGFydGluZyBEZWZlcnJlZCBvYmplY3QgXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZVBvaW50ZXIgPSBzdGFydERlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGtleUFyZyBpbiB0aGlzLnRhc2tBcnJheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVBvaW50ZXIudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlUG9pbnRlciA9IHRoaXMudGFza0FycmF5W2tleUFyZ10udHJpZ2dlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZVBvaW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzdGFydERlZmVycmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMudGFza0FycmF5ID0gb3B0aW9uc0FyZy50YXNrQXJyYXk7XHJcbiAgICAgICAgdGhpcy5fb3JhT2JqZWN0ID0gcGx1Z2lucy5iZWF1dHlsb2cub3JhKFwiVGFza2NoYWluIGlkbGVcIixcImJsdWVcIik7XHJcbiAgICB9XHJcbiAgICBhZGRUYXNrKHRhc2tBcmc6VGFzayl7XHJcbiAgICAgICAgdGhpcy50YXNrQXJyYXkucHVzaCh0YXNrQXJnKTtcclxuICAgIH07XHJcbiAgICByZW1vdmVUYXNrKHRhc2tBcmc6VGFzayl7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9O1xyXG4gICAgc2hpZnRUYXNrKCl7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgdHJpZ2dlcigpe1xyXG4gICAgICAgIHRoaXMuX29yYU9iamVjdC5zdGFydCh0aGlzLm5hbWUgKyBcInJ1bm5pbmdcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5sZXQgbXlUYXNrID0gbmV3IFRhc2tjaGFpbihcclxuICAgIHtcclxuICAgICAgICB0YXNrQXJyYXk6IFtcclxuICAgICAgICAgICAgbmV3IFRhc2soe1xyXG4gICAgICAgICAgICAgICAgdGFza0Z1bmN0aW9uOmZ1bmN0aW9uKCl7fVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuKTsiXX0=
