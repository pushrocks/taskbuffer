"use strict";
// TaskChain chains tasks
// and extends Task
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
class Taskchain extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.merge({
            name: 'unnamed Taskchain',
            log: false
        }, optionsArg, {
            taskFunction: (x) => {
                let done = plugins.q.defer(); // this is the starting Deferred object
                let taskCounter = 0; // counter for iterating async over the taskArray
                let iterateTasks = (x) => {
                    if (typeof this.taskArray[taskCounter] !== 'undefined') {
                        this._oraObject.text(this.name + ' running: Task' + this.taskArray[taskCounter].name);
                        this.taskArray[taskCounter].trigger(x)
                            .then((x) => {
                            plugins.beautylog.ok(this.taskArray[taskCounter].name);
                            taskCounter++;
                            iterateTasks(x);
                        });
                    }
                    else {
                        this._oraObject.endOk('Taskchain "' + this.name + '" completed successfully');
                        done.resolve(x);
                    }
                };
                iterateTasks(x);
                return done.promise;
            }
        });
        super(options);
        this.taskArray = optionsArg.taskArray;
        this._oraObject = plugins.beautylog.ora;
        if (optionsArg.log === true) {
            this._oraObject.start();
        }
    }
    addTask(taskArg) {
        this.taskArray.push(taskArg);
    }
    removeTask(taskArg) {
        // TODO:
    }
    shiftTask() {
        // TODO:
    }
}
exports.Taskchain = Taskchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUF5QjtBQUN6QixtQkFBbUI7O0FBRW5CLGdEQUErQztBQUMvQyx1RUFBZ0Q7QUFHaEQsZUFBdUIsU0FBUSw4QkFBSTtJQUdqQyxZQUFZLFVBTVg7UUFDQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDaEM7WUFDRSxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLEdBQUcsRUFBRSxLQUFLO1NBQ1gsRUFDRCxVQUFVLEVBQ1Y7WUFDRSxZQUFZLEVBQUUsQ0FBQyxDQUFNO2dCQUNuQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBLENBQUMsdUNBQXVDO2dCQUNwRSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUEsQ0FBQyxpREFBaUQ7Z0JBQ3JFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztvQkFDbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFFLFdBQVcsQ0FBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxXQUFXLENBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTt3QkFDdkYsSUFBSSxDQUFDLFNBQVMsQ0FBRSxXQUFXLENBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzZCQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUUsV0FBVyxDQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBQ3hELFdBQVcsRUFBRSxDQUFBOzRCQUNiLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFDakIsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRywwQkFBMEIsQ0FBQyxDQUFBO3dCQUM3RSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNqQixDQUFDO2dCQUNILENBQUMsQ0FBQTtnQkFDRCxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDckIsQ0FBQztTQUNGLENBQ0YsQ0FBQTtRQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFBO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxDQUFFLE9BQWE7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUNELFVBQVUsQ0FBRSxPQUFhO1FBQ3ZCLFFBQVE7SUFDVixDQUFDO0lBQ0QsU0FBUztRQUNQLFFBQVE7SUFDVixDQUFDO0NBQ0Y7QUF2REQsOEJBdURDIn0=