"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
class Taskparallel extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.merge(optionsArg, {
            taskFunction: () => {
                let done = plugins.q.defer();
                let promiseArray = []; // stores promises of all tasks, since they run in parallel
                this.taskArray.forEach(function (taskArg) {
                    promiseArray.push(taskArg.trigger());
                });
                Promise.all(promiseArray)
                    .then(done.resolve);
                return done.promise;
            }
        });
        super(options);
        this.taskArray = optionsArg.taskArray;
    }
}
exports.Taskparallel = Taskparallel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2twYXJhbGxlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrcGFyYWxsZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBK0M7QUFFL0MsdUVBQWdEO0FBRWhELGtCQUEwQixTQUFRLDhCQUFJO0lBRWxDLFlBQVksVUFFWDtRQUNHLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUM5QixVQUFVLEVBQ1Y7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLDJEQUEyRDtnQkFDbEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFPO29CQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztxQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQ0osQ0FBQztRQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0NBQ0o7QUF2QkQsb0NBdUJDIn0=