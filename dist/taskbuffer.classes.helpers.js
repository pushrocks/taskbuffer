"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
var q_1 = require("q");
exports.Promise = q_1.Promise;
exports.emptyTaskFunction = function (x) {
    let done = plugins.Q.defer();
    done.resolve();
    return done.promise;
};
exports.isTask = function (taskArg) {
    if (taskArg instanceof taskbuffer_classes_task_1.Task
        && typeof taskArg.task === "function") {
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
    let done = plugins.Q.defer();
    //  set running params
    taskArg.running = true;
    done.promise.then(function () { taskArg.running = false; });
    // handle options
    let options = plugins.lodash.merge({ x: undefined, touchedTasksArray: [] }, optionsArg);
    let x = options.x;
    let touchedTasksArray = options.touchedTasksArray;
    touchedTasksArray.push(taskArg);
    // run the task cascade
    let localDeferred = plugins.Q.defer();
    localDeferred.promise
        .then(() => {
        if (taskArg.preTask && !exports.isTaskTouched(taskArg.preTask, touchedTasksArray)) {
            return exports.runTask(taskArg.preTask, { x: x, touchedTasksArray: touchedTasksArray });
        }
        else {
            let done2 = plugins.Q.defer();
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
            let done2 = plugins.Q.defer();
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
        let done = plugins.Q.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCwwQ0FBb0MsMkJBQTJCLENBQUMsQ0FBQTtBQUdoRSxrQkFBc0IsR0FBRyxDQUFDO0FBQWxCLDhCQUFrQjtBQUVmLHlCQUFpQixHQUFrQixVQUFVLENBQUM7SUFDckQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFUyxjQUFNLEdBQUcsVUFBVSxPQUFPO0lBQ2pDLEVBQUUsQ0FBQyxDQUNDLE9BQU8sWUFBWSw4QkFBSTtXQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUdTLHFCQUFhLEdBQUcsQ0FBQyxPQUFhLEVBQUUsaUJBQXlCO0lBQ2hFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztB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