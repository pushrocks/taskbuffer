"use strict";
const plugins = require("./taskbuffer.plugins");
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
exports.emptyTaskFunction = function () {
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
exports.runTask = function (taskArg, optionsArg = { touchedTasksArray: [] }) {
    let done = plugins.Q.defer();
    taskArg.running = true;
    done.promise.then(function () { taskArg.running = false; });
    let localDeferred = plugins.Q.defer();
    let touchedTasksArray;
    if (optionsArg.touchedTasksArray) {
        touchedTasksArray = optionsArg.touchedTasksArray;
    }
    else {
        touchedTasksArray = [];
    }
    touchedTasksArray.push(taskArg);
    localDeferred.promise
        .then(() => {
        if (taskArg.preTask && !exports.isTaskTouched(taskArg.preTask, touchedTasksArray)) {
            return exports.runTask(taskArg.preTask, { touchedTasksArray: touchedTasksArray });
        }
        else {
            let done2 = plugins.Q.defer();
            done2.resolve();
            return done2.promise;
        }
    })
        .then(() => {
        return taskArg.task();
    })
        .then(() => {
        if (taskArg.afterTask && !exports.isTaskTouched(taskArg.afterTask, touchedTasksArray)) {
            return exports.runTask(taskArg.afterTask, { touchedTasksArray: touchedTasksArray });
        }
        else {
            let done2 = plugins.Q.defer();
            done2.resolve();
            return done2.promise;
        }
    })
        .then(() => {
        done.resolve();
    });
    localDeferred.resolve();
    return done.promise;
};
exports.runBufferedTask = (taskArg) => {
    let recursiveBufferRunner = () => {
        if (taskArg.bufferCounter > 0) {
            taskArg.runningBuffered = true;
            taskArg.bufferCounter--;
            exports.runTask(taskArg)
                .then(recursiveBufferRunner);
        }
        else {
            taskArg.runningBuffered = false;
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCwwQ0FBaUMsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRCx5QkFBaUIsR0FBaUI7SUFDekMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFUyxjQUFNLEdBQUcsVUFBUyxPQUFPO0lBQ2hDLEVBQUUsQ0FBQSxDQUNFLE9BQU8sWUFBWSw4QkFBSTtXQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFDL0IsQ0FBQyxDQUFBLENBQUM7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUdTLHFCQUFhLEdBQUcsQ0FBQyxPQUFZLEVBQUUsaUJBQXdCO0lBQzlELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7UUFDbEMsRUFBRSxDQUFBLENBQUMsT0FBTyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN0QyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFVSxlQUFPLEdBQUcsVUFBUyxPQUFZLEVBQUMs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