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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2twYXJhbGxlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrcGFyYWxsZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBK0M7QUFFL0MsdUVBQWdEO0FBRWhELGtCQUEwQixTQUFRLDhCQUFJO0lBRXBDLFlBQWEsVUFFWjtRQUNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNoQyxVQUFVLEVBQ1Y7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDNUIsSUFBSSxZQUFZLEdBQW1CLEVBQUUsQ0FBQSxDQUFDLDJEQUEyRDtnQkFDakcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFPO29CQUN0QyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUN0QyxDQUFDLENBQUMsQ0FBQTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztxQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDckIsQ0FBQztTQUNGLENBQ0YsQ0FBQTtRQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0Y7QUF2QkQsb0NBdUJDIn0=