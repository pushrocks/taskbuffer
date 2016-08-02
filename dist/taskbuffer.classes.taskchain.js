"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
class Taskchain extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.merge({
            name: "unnamed Taskchain",
            log: false
        }, optionsArg, {
            taskFunction: (x) => {
                let done = plugins.Q.defer(); // this is the starting Deferred object 
                let taskCounter = 0; // counter for iterating async over the taskArray
                let iterateTasks = (x) => {
                    if (typeof this.taskArray[taskCounter] != "undefined") {
                        this._oraObject.text(this.name + " running: Task" + this.taskArray[taskCounter].name);
                        this.taskArray[taskCounter].trigger(x)
                            .then((x) => {
                            plugins.beautylog.ok(this.taskArray[taskCounter].name);
                            taskCounter++;
                            iterateTasks(x);
                        });
                    }
                    else {
                        this._oraObject.endOk("Taskchain \"" + this.name + "\" completed successfully");
                        done.resolve(x);
                    }
                };
                iterateTasks(x);
                return done.promise;
            }
        });
        super(options);
        this.taskArray = optionsArg.taskArray;
        this._oraObject = new plugins.beautylog.Ora("Taskchain idle", "blue");
        if (optionsArg.log === true) {
            this._oraObject.start();
        }
        ;
    }
    addTask(taskArg) {
        this.taskArray.push(taskArg);
    }
    ;
    removeTask(taskArg) {
        //TODO
    }
    ;
    shiftTask() {
    }
    ;
}
exports.Taskchain = Taskchain;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsMENBQW1CLDJCQUEyQixDQUFDLENBQUE7QUFHL0Msd0JBQStCLDhCQUFJO0lBRy9CLFlBQVksVUFNWDtRQUNHLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUM5QjtZQUNJLElBQUksRUFBQyxtQkFBbUI7WUFDeEIsR0FBRyxFQUFDLEtBQUs7U0FDWixFQUNELFVBQVUsRUFDVjtZQUNJLFlBQVksRUFBRSxDQUFDLENBQUs7Z0JBQ2hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQ3RFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlEQUFpRDtnQkFDdEUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUEsQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0RixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NkJBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkQsV0FBVyxFQUFFLENBQUM7NEJBQ2QsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFJLDJCQUEyQixDQUFDLENBQUM7d0JBQ2pGLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztTQUNKLENBQ0osQ0FBQztRQUNGLE1BQU0sT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFZO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0lBQ0QsVUFBVSxDQUFDLE9BQVk7UUFDbkIsTUFBTTtJQUNWLENBQUM7O0lBQ0QsU0FBUztJQUVULENBQUM7O0FBQ0wsQ0FBQztBQXZEWSxpQkFBUyxZQXVEckIsQ0FBQTtBQUFBLENBQUMifQ==