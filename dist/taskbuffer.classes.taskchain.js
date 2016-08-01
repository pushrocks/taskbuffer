"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
const helpers = require("./taskbuffer.classes.helpers");
class Taskchain extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.merge({
            name: "unnamed Taskchain",
            log: false
        }, optionsArg, {
            taskFunction: () => {
                let done = plugins.Q.defer(); // this is the starting Deferred object 
                let taskCounter = 0;
                let iterateTasks = () => {
                    if (typeof this.taskArray[taskCounter] != "undefined") {
                        this._oraObject.text(this.name + " running: Task" + this.taskArray[taskCounter].name);
                        this.taskArray[taskCounter].trigger()
                            .then(() => {
                            plugins.beautylog.ok(this.taskArray[taskCounter].name);
                            taskCounter++;
                            iterateTasks();
                        });
                    }
                    else {
                        this._oraObject.endOk("Taskchain \"" + this.name + "\" completed successfully");
                        done.resolve();
                    }
                };
                iterateTasks();
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
    trigger() {
        this._oraObject.start(this.name + " running...");
        return helpers.runTask(this);
    }
}
exports.Taskchain = Taskchain;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsMENBQW1CLDJCQUEyQixDQUFDLENBQUE7QUFDL0MsTUFBTyxPQUFPLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUV6RCx3QkFBK0IsOEJBQUk7SUFHL0IsWUFBWSxVQUlYO1FBQ0csSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQzlCO1lBQ0ksSUFBSSxFQUFDLG1CQUFtQjtZQUN4QixHQUFHLEVBQUMsS0FBSztTQUNaLEVBQ0QsVUFBVSxFQUNWO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQ3RFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxZQUFZLEdBQUc7b0JBQ2YsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFBLENBQUM7d0JBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUU7NkJBQ2hDLElBQUksQ0FBQzs0QkFDRixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN2RCxXQUFXLEVBQUUsQ0FBQzs0QkFDZCxZQUFZLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBSSwyQkFBMkIsQ0FBQyxDQUFDO3dCQUNqRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO2dCQUNGLFlBQVksRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7U0FDSixDQUNKLENBQUM7UUFDRixNQUFNLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBQUEsQ0FBQztJQUNOLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBWTtRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDOztJQUNELFVBQVUsQ0FBQyxPQUFZO1FBQ25CLE1BQU07SUFDVixDQUFDOztJQUNELFNBQVM7SUFFVCxDQUFDOztJQUNELE9BQU87UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7QUFDTCxDQUFDO0FBekRZLGlCQUFTLFlBeURyQixDQUFBO0FBQUEsQ0FBQyJ9