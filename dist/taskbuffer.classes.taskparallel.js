"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2twYXJhbGxlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrcGFyYWxsZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdEQUErQztBQUUvQyx1RUFBZ0Q7QUFFaEQsa0JBQTBCLFNBQVEsOEJBQUk7SUFFbEMsWUFBWSxVQUVYO1FBQ0csSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQzlCLFVBQVUsRUFDVjtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QixJQUFJLFlBQVksR0FBbUIsRUFBRSxDQUFDLENBQUMsMkRBQTJEO2dCQUNsRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQU87b0JBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO3FCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FDSixDQUFDO1FBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO0lBQzFDLENBQUM7Q0FDSjtBQXZCRCxvQ0F1QkMifQ==