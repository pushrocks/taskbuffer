"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
class Taskparallel extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.merge(optionsArg, {
            taskFunction: () => {
                let done = plugins.Q.defer();
                let promiseArray = []; // stores promises of all tasks, since they run in parallel
                this.taskArray.forEach(function (taskArg) {
                    promiseArray.push(taskArg.trigger());
                });
                plugins.Q.all(promiseArray)
                    .then(done.resolve);
                return done.promise;
            }
        });
        super(options);
        this.taskArray = optionsArg.taskArray;
    }
}
exports.Taskparallel = Taskparallel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2twYXJhbGxlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrcGFyYWxsZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHNCQUN6QixDQUFDLENBRDhDO0FBRS9DLDBDQUFxQiwyQkFFckIsQ0FBQyxDQUYrQztBQUVoRCwyQkFBa0MsOEJBQUk7SUFFbEMsWUFBWSxVQUVYO1FBQ0csSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQzlCLFVBQVUsRUFDVjtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QixJQUFJLFlBQVksR0FBc0IsRUFBRSxDQUFDLENBQUMsMkRBQTJEO2dCQUNyRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQU87b0JBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztxQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQ0osQ0FBQztRQUNGLE1BQU0sT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDMUMsQ0FBQztBQUNMLENBQUM7QUF2Qlksb0JBQVksZUF1QnhCLENBQUEifQ==