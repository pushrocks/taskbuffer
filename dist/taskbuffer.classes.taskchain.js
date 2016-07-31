"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
const helpers = require("./taskbuffer.classes.helpers");
class Taskchain extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        let options = plugins.lodash.assign({
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
                            this._oraObject.log(this.taskArray[taskCounter].name, "ok");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsMENBQW1CLDJCQUEyQixDQUFDLENBQUE7QUFDL0MsTUFBTyxPQUFPLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUV6RCx3QkFBK0IsOEJBQUk7SUFHL0IsWUFBWSxVQUlYO1FBQ0csSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQy9CO1lBQ0ksSUFBSSxFQUFDLG1CQUFtQjtZQUN4QixHQUFHLEVBQUMsS0FBSztTQUNaLEVBQ0QsVUFBVSxFQUNWO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQ3RFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxZQUFZLEdBQUc7b0JBQ2YsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFBLENBQUM7d0JBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUU7NkJBQ2hDLElBQUksQ0FBQzs0QkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDM0QsV0FBVyxFQUFFLENBQUM7NEJBQ2QsWUFBWSxFQUFFLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUksMkJBQTJCLENBQUMsQ0FBQzt3QkFDakYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuQixDQUFDO2dCQUNMLENBQUMsQ0FBQztnQkFDRixZQUFZLEVBQUUsQ0FBQztnQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FDSixDQUFDO1FBQ0YsTUFBTSxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFZO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0lBQ0QsVUFBVSxDQUFDLE9BQVk7UUFDbkIsTUFBTTtJQUNWLENBQUM7O0lBQ0QsU0FBUztJQUVULENBQUM7O0lBQ0QsT0FBTztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztBQUNMLENBQUM7QUF0RFksaUJBQVMsWUFzRHJCLENBQUE7QUFBQSxDQUFDIn0=