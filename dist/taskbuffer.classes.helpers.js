"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
exports.emptyTaskFunction = function (x) {
    let done = plugins.q.defer();
    done.resolve();
    return done.promise;
};
exports.isTask = function (taskArg) {
    if (taskArg instanceof taskbuffer_classes_task_1.Task
        && typeof taskArg.taskFunction === 'function') {
        return true;
    }
    else {
        return false;
    }
};
exports.isTaskTouched = (taskArg, touchedTasksArray) => {
    let result = false;
    for (let keyArg in touchedTasksArray) {
        if (taskArg === touchedTasksArray[keyArg]) {
            result = true;
        }
    }
    return result;
};
exports.runTask = function (taskArg, optionsArg) {
    let done = plugins.q.defer();
    //  set running params
    taskArg.running = true;
    done.promise.then(function () { taskArg.running = false; });
    // handle options
    let options = plugins.lodash.merge({ x: undefined, touchedTasksArray: [] }, optionsArg);
    let x = options.x;
    let touchedTasksArray = options.touchedTasksArray;
    touchedTasksArray.push(taskArg);
    // run the task cascade
    let localDeferred = plugins.q.defer();
    localDeferred.promise
        .then(() => {
        if (taskArg.preTask && !exports.isTaskTouched(taskArg.preTask, touchedTasksArray)) {
            return exports.runTask(taskArg.preTask, { x: x, touchedTasksArray: touchedTasksArray });
        }
        else {
            let done2 = plugins.q.defer();
            done2.resolve(x);
            return done2.promise;
        }
    })
        .then(x => {
        return taskArg.taskFunction(x);
    })
        .then(x => {
        if (taskArg.afterTask && !exports.isTaskTouched(taskArg.afterTask, touchedTasksArray)) {
            return exports.runTask(taskArg.afterTask, { x: x, touchedTasksArray: touchedTasksArray });
        }
        else {
            let done2 = plugins.q.defer();
            done2.resolve(x);
            return done2.promise;
        }
    })
        .then(x => {
        done.resolve(x);
    }).catch((err) => {
        console.log(err);
    });
    localDeferred.resolve();
    return done.promise;
};
class CycleCounter {
    constructor(taskArg) {
        this.cycleObjectArray = [];
        this.task = taskArg;
    }
    ;
    getPromiseForCycle(cycleCountArg) {
        let done = plugins.q.defer();
        let cycleObject = {
            cycleCounter: cycleCountArg,
            deferred: done
        };
        this.cycleObjectArray.push(cycleObject);
        return done.promise;
    }
    ;
    informOfCycle(x) {
        let newCycleObjectArray = [];
        this.cycleObjectArray.forEach(cycleObjectArg => {
            cycleObjectArg.cycleCounter--;
            if (cycleObjectArg.cycleCounter <= 0) {
                cycleObjectArg.deferred.resolve(x);
            }
            else {
                newCycleObjectArray.push(cycleObjectArg);
            }
            ;
        });
        this.cycleObjectArray = newCycleObjectArray;
    }
}
exports.CycleCounter = CycleCounter;
class BufferRunner {
    constructor(taskArg) {
        // initialze by default
        this.bufferCounter = 0;
        this.bufferMax = 1;
        this.running = false;
        this.task = taskArg;
    }
    ;
    _run(x) {
        let recursiveBufferRunner = (x) => {
            if (this.bufferCounter >= 0) {
                this.running = true;
                this.task.running = true;
                exports.runTask(this.task, { x: x })
                    .then((x) => {
                    this.bufferCounter--;
                    this.task.cycleCounter.informOfCycle(x);
                    recursiveBufferRunner(x);
                });
            }
            else {
                this.running = false;
                this.task.running = false;
            }
        };
        recursiveBufferRunner(x);
    }
    ;
    setBufferMax(bufferMaxArg) {
        this.bufferMax = bufferMaxArg;
    }
    ;
    trigger(x) {
        if (!(this.bufferCounter >= this.bufferMax)) {
            this.bufferCounter++;
        }
        ;
        let returnPromise = this.task.cycleCounter.getPromiseForCycle(this.bufferCounter + 1);
        if (!this.running) {
            this._run(x);
        }
        return returnPromise;
    }
    ;
}
exports.BufferRunner = BufferRunner;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0RBQWlEO0FBQ2pELHVFQUErRDtBQUVwRCxRQUFBLGlCQUFpQixHQUFrQixVQUFVLENBQUM7SUFDdkQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFVSxRQUFBLE1BQU0sR0FBRyxVQUFVLE9BQWE7SUFDekMsRUFBRSxDQUFDLENBQ0QsT0FBTyxZQUFZLDhCQUFJO1dBQ3BCLE9BQU8sT0FBTyxDQUFDLFlBQVksS0FBSyxVQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUdVLFFBQUEsYUFBYSxHQUFHLENBQUMsT0FBYSxFQUFFLGlCQUF5QjtJQUNsRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxpQkFBaUIsQ0FBRSxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNmLENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUVVLFFBQUEsT0FBTyxHQUFHLFVBQVUsT0FBYSxFQUFFLFVBQThDO0lBQzFGLElBQUks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