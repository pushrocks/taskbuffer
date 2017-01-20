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
                let done = plugins.q.defer(); // this is the starting Deferred object 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdEQUFnRDtBQUNoRCx1RUFBK0M7QUFHL0MsZUFBdUIsU0FBUSw4QkFBSTtJQUcvQixZQUFZLFVBTVg7UUFDRyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDOUI7WUFDSSxJQUFJLEVBQUMsbUJBQW1CO1lBQ3hCLEdBQUcsRUFBQyxLQUFLO1NBQ1osRUFDRCxVQUFVLEVBQ1Y7WUFDSSxZQUFZLEVBQUUsQ0FBQyxDQUFLO2dCQUNoQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsd0NBQXdDO2dCQUN0RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxpREFBaUQ7Z0JBQ3RFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztvQkFDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFBLENBQUM7d0JBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzZCQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZELFdBQVcsRUFBRSxDQUFDOzRCQUNkLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBSSwyQkFBMkIsQ0FBQyxDQUFDO3dCQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixDQUFDO2dCQUNMLENBQUMsQ0FBQztnQkFDRixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7U0FDSixDQUNKLENBQUM7UUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFZO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFBQSxDQUFDO0lBQ0YsVUFBVSxDQUFDLE9BQVk7UUFDbkIsTUFBTTtJQUNWLENBQUM7SUFBQSxDQUFDO0lBQ0YsU0FBUztJQUVULENBQUM7SUFBQSxDQUFDO0NBQ0w7QUF2REQsOEJBdURDO0FBQUEsQ0FBQyJ9