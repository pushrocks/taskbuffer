"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    getPromiseForCycle(cycleCountArg) {
        let done = plugins.q.defer();
        let cycleObject = {
            cycleCounter: cycleCountArg,
            deferred: done
        };
        this.cycleObjectArray.push(cycleObject);
        return done.promise;
    }
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
    setBufferMax(bufferMaxArg) {
        this.bufferMax = bufferMaxArg;
    }
    trigger(x) {
        if (!(this.bufferCounter >= this.bufferMax)) {
            this.bufferCounter++;
        }
        let returnPromise = this.task.cycleCounter.getPromiseForCycle(this.bufferCounter + 1);
        if (!this.running) {
            this._run(x);
        }
        return returnPromise;
    }
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
}
exports.BufferRunner = BufferRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFnRDtBQUNoRCx1RUFBK0Q7QUFFcEQsUUFBQSxpQkFBaUIsR0FBa0IsVUFBVSxDQUFDO0lBQ3ZELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRVUsUUFBQSxNQUFNLEdBQUcsVUFBVSxPQUFhO0lBQ3pDLEVBQUUsQ0FBQyxDQUNELE9BQU8sWUFBWSw4QkFBSTtXQUNwQixPQUFPLE9BQU8sQ0FBQyxZQUFZLEtBQUssVUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNkLENBQUM7QUFDSCxDQUFDLENBQUE7QUFFVSxRQUFBLGFBQWEsR0FBRyxDQUFDLE9BQWEsRUFBRSxpQkFBeUI7SUFDbEUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssaUJBQWlCLENBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFFVSxRQUFBLE9BQU8sR0FBRyxVQUFVLE9BQWEsRUFBRSxVQUE4QztJQUMxRixJQUFJ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