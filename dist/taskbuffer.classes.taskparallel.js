"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
class Taskparallel extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.assign(optionsArg, {
            taskFunction: () => {
                let done = plugins.Q.defer();
                let promiseArray; // stores promises of all tasks, since they run in parallel
                this.taskArray.forEach(function (taskArg) {
                    promiseArray.push(taskArg.trigger());
                });
                plugins.Q.all(promiseArray)
                    .then(done.resolve);
                return done.promise;
            }
        });
        super(options);
    }
}
exports.Taskparallel = Taskparallel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2twYXJhbGxlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrcGFyYWxsZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHNCQUN6QixDQUFDLENBRDhDO0FBRS9DLDBDQUFtQiwyQkFFbkIsQ0FBQyxDQUY2QztBQUU5QywyQkFBa0MsOEJBQUk7SUFFbEMsWUFBWSxVQUVYO1FBQ0csSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQy9CLFVBQVUsRUFDVjtZQUNJLFlBQVksRUFBQztnQkFDVCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QixJQUFJLFlBQVksQ0FBQyxDQUFDLDJEQUEyRDtnQkFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFZO29CQUN4QyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQTtnQkFDRixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7cUJBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7U0FDSixDQUNKLENBQUE7UUFDRCxNQUFNLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7QUFDTCxDQUFDO0FBdEJZLG9CQUFZLGVBc0J4QixDQUFBIn0=