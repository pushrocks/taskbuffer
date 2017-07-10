"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.runTask = (taskArg, optionsArg) => __awaiter(this, void 0, void 0, function* () {
    let done = plugins.q.defer();
    // pay respect to execDelay
    if (taskArg.execDelay) {
        yield plugins.smartdelay.delayFor(taskArg.execDelay);
    }
    //  set running params
    taskArg.running = true;
    done.promise.then(() => __awaiter(this, void 0, void 0, function* () { taskArg.running = false; }));
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
    return yield done.promise;
});
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
        this.running = false;
        this.task = taskArg;
    }
    trigger(x) {
        if (!(this.bufferCounter >= this.task.bufferMax)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELHVFQUErRDtBQUVwRCxRQUFBLGlCQUFpQixHQUFrQixVQUFVLENBQUM7SUFDdkQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFVSxRQUFBLE1BQU0sR0FBRyxVQUFVLE9BQWE7SUFDekMsRUFBRSxDQUFDLENBQ0QsT0FBTyxZQUFZLDhCQUFJO1dBQ3BCLE9BQU8sT0FBTyxDQUFDLFlBQVksS0FBSyxVQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVVLFFBQUEsYUFBYSxHQUFHLENBQUMsT0FBYSxFQUFFLGlCQUF5QjtJQUNsRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxpQkFBaUIsQ0FBRSxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNmLENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUVVLFFBQUEsT0FBTyxHQUFHLENBQU8sT0FBYSxFQUFFLFVBQThDO0lB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