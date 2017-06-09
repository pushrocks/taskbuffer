"use strict";
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
        ;
    }
    addTask(taskArg) {
        this.taskArray.push(taskArg);
    }
    ;
    removeTask(taskArg) {
        // TODO
    }
    ;
    shiftTask() {
    }
    ;
}
exports.Taskchain = Taskchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rhc2tidWZmZXIuY2xhc3Nlcy50YXNrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBZ0Q7QUFDaEQsdUVBQWlEO0FBR2pELGVBQXVCLFNBQVEsOEJBQUk7SUFHakMsWUFBWSxVQU1YO1FBQ0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2hDO1lBQ0UsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixHQUFHLEVBQUUsS0FBSztTQUNYLEVBQ0QsVUFBVSxFQUNWO1lBQ0UsWUFBWSxFQUFFLENBQUMsQ0FBTTtnQkFDbkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLHVDQUF1QztnQkFDcEUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBLENBQUMsaURBQWlEO2dCQUNyRSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBRSxXQUFXLENBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsV0FBVyxDQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQ3ZGLElBQUksQ0FBQyxTQUFTLENBQUUsV0FBVyxDQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs2QkFDckMsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFFLFdBQVcsQ0FBRSxDQUFDLElBQUksQ0FBQyxDQUFBOzRCQUN4RCxXQUFXLEVBQUUsQ0FBQTs0QkFDYixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQ2pCLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsMEJBQTBCLENBQUMsQ0FBQTt3QkFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDakIsQ0FBQztnQkFDSCxDQUFDLENBQUE7Z0JBQ0QsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1lBQ3JCLENBQUM7U0FDRixDQUNGLENBQUE7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUE7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQTtRQUN2QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN6QixDQUFDO1FBQUEsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBYTtRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUNGLFVBQVUsQ0FBQyxPQUFhO1FBQ3RCLE9BQU87SUFDVCxDQUFDO0lBQUEsQ0FBQztJQUNGLFNBQVM7SUFFVCxDQUFDO0lBQUEsQ0FBQztDQUNIO0FBdkRELDhCQXVEQyJ9