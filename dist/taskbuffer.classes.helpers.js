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
    exports.updateTaskStatus(taskArg, "running");
    done.promise.then(function () { exports.updateTaskStatus(taskArg, "idle"); });
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
            taskArg.bufferCounter--;
            exports.runTask(taskArg)
                .then(recursiveBufferRunner);
        }
    };
};
exports.updateTaskStatus = (taskArg, statusArg) => {
    switch (statusArg) {
        case "running":
            taskArg.running = true;
            taskArg.idle = false;
            break;
        case "idle":
            taskArg.running = false;
            taskArg.idle = true;
            break;
        default:
            throw new Error("status not recognised");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMuaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCwwQ0FBbUIsMkJBQTJCLENBQUMsQ0FBQTtBQUVwQyx5QkFBaUIsR0FBRztJQUMzQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVTLGNBQU0sR0FBRyxVQUFTLE9BQU87SUFDaEMsRUFBRSxDQUFBLENBQ0UsT0FBTyxZQUFZLDhCQUFJO1dBQ3BCLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxVQUMvQixDQUFDLENBQUEsQ0FBQztRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBR1MscUJBQWEsR0FBRyxDQUFDLE9BQVksRUFBRSxpQkFBd0I7SUFDOUQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLGlCQUFpQixDQUFDLENBQUEsQ0FBQztRQUNsQyxFQUFFLENBQUEsQ0FBQyxPQUFPLEtBQUssaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ3RDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQTtBQUVVLGVBQU8sR0FBRyxVQUFTLE9BQVksRUFBQyxV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