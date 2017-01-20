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
        && typeof taskArg.taskFunction === "function") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0RBQWlEO0FBQ2pELHVFQUFnRTtBQUVyRCxRQUFBLGlCQUFpQixHQUFrQixVQUFVLENBQUM7SUFDckQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFUyxRQUFBLE1BQU0sR0FBRyxVQUFVLE9BQWE7SUFDdkMsRUFBRSxDQUFDLENBQ0MsT0FBTyxZQUFZLDhCQUFJO1dBQ3BCLE9BQU8sT0FBTyxDQUFDLFlBQVksS0FBSyxVQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBR1MsUUFBQSxhQUFhLEdBQUcsQ0FBQyxPQUFhLEVBQUUsaUJBQXlCO0lBQ2hFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFVSxRQUFBLE9BQU8sR0FBRyxVQUFVLE9BQWEsRUFBRSxVQUE2QztJQUN2RixJ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