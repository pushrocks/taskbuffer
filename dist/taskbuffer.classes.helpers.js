"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./taskbuffer.plugins");
var taskbuffer_classes_1 = require("./taskbuffer.classes");
exports.emptyTaskFunction = function () {
    var done = plugins.Q.defer();
    done.resolve();
    return done.promise;
};
exports.isTask = function (taskArg) {
    if (taskArg instanceof taskbuffer_classes_1.Task
        && typeof taskArg.task === "function") {
        return true;
    }
    else {
        return false;
    }
};
exports.isTaskTouched = function (taskArg, touchedTasksArray) {
    var result = false;
    for (var keyArg in touchedTasksArray) {
        if (taskArg === touchedTasksArray[keyArg]) {
            result = true;
        }
    }
    return result;
};
exports.runTask = function (taskArg, optionsArg) {
    if (optionsArg === void 0) { optionsArg = { touchedTasksArray: [] }; }
    var done = plugins.Q.defer();
    exports.updateTaskStatus(taskArg, "running");
    done.promise.then(function () { exports.updateTaskStatus(taskArg, "idle"); });
    var localDeferred = plugins.Q.defer();
    var touchedTasksArray;
    if (optionsArg.touchedTasksArray) {
        touchedTasksArray = optionsArg.touchedTasksArray;
    }
    else {
        touchedTasksArray = [];
    }
    touchedTasksArray.push(taskArg);
    localDeferred.promise
        .then(function () {
        if (taskArg.preTask && !exports.isTaskTouched(taskArg.preTask, touchedTasksArray)) {
            return exports.runTask(taskArg.preTask, { touchedTasksArray: touchedTasksArray });
        }
        else {
            var done2 = plugins.Q.defer();
            done2.resolve();
            return done2.promise;
        }
    })
        .then(function () {
        return taskArg.task();
    })
        .then(function () {
        if (taskArg.afterTask && !exports.isTaskTouched(taskArg.afterTask, touchedTasksArray)) {
            return exports.runTask(taskArg.afterTask, { touchedTasksArray: touchedTasksArray });
        }
        else {
            var done2 = plugins.Q.defer();
            done2.resolve();
            return done2.promise;
        }
    })
        .then(function () {
        done.resolve();
    });
    localDeferred.resolve();
    return done.promise;
};
exports.runBufferedTask = function (taskArg) {
    var recursiveBufferRunner = function () {
        if (taskArg.bufferCounter > 0) {
            taskArg.bufferCounter--;
            exports.runTask(taskArg)
                .then(recursiveBufferRunner);
        }
    };
};
exports.updateTaskStatus = function (taskArg, statusArg) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tidWZmZXIuY2xhc3Nlcy5oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0Q0FBNEM7QUFDNUMsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCxtQ0FBbUIsc0JBRW5CLENBQUMsQ0FGd0M7QUFFOUIseUJBQWlCLEdBQUc7SUFDM0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFUyxjQUFNLEdBQUcsVUFBUyxPQUFPO0lBQ2hDLEVBQUUsQ0FBQSxDQUNFLE9BQU8sWUFBWSx5QkFBSTtXQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFDL0IsQ0FBQyxDQUFBLENBQUM7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUdTLHFCQUFhLEdBQUcsVUFBQyxPQUFZLEVBQUUsaUJBQXdCO0lBQzlELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7UUFDbEMsRUFBRSxDQUFBLENBQUMsT0FBTyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN0QyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFVSxlQUFPLEdBQUcsVUFBUyxPQUFZLEVBQUMsVUFBOEQ7SUFBOUQsMEJBQThELEdBQTlELGVBQXlDLGlCQUFpQixFQUFDLEVBQUUs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Q0FBQyxDQUFDO1FBQ2hCLEtBQUssU0FBUztZQUNWLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEtBQUssQ0FBQztRQUNWLEtBQUssTUFBTTtZQUNQLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUssQ0FBQztRQUNWO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDTCxDQUFDLENBQUEiLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLmhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5pbXBvcnQgcGx1Z2lucyA9IHJlcXVpcmUoXCIuL3Rhc2tidWZmZXIucGx1Z2luc1wiKTtcbmltcG9ydCB7VGFza30gZnJvbSBcIi4vdGFza2J1ZmZlci5jbGFzc2VzXCJcblxuZXhwb3J0IGxldCBlbXB0eVRhc2tGdW5jdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLlEuZGVmZXIoKTtcbiAgICBkb25lLnJlc29sdmUoKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTtcblxuZXhwb3J0IGxldCBpc1Rhc2sgPSBmdW5jdGlvbih0YXNrQXJnKTpib29sZWFue1xuICAgIGlmKFxuICAgICAgICB0YXNrQXJnIGluc3RhbmNlb2YgVGFza1xuICAgICAgICAmJiB0eXBlb2YgdGFza0FyZy50YXNrID09PSBcImZ1bmN0aW9uXCJcbiAgICApe1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuXG5leHBvcnQgbGV0IGlzVGFza1RvdWNoZWQgPSAodGFza0FyZzpUYXNrLCB0b3VjaGVkVGFza3NBcnJheTpUYXNrW10pOmJvb2xlYW4gPT4ge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBrZXlBcmcgaW4gdG91Y2hlZFRhc2tzQXJyYXkpe1xuICAgICAgICBpZih0YXNrQXJnID09PSB0b3VjaGVkVGFza3NBcnJheVtrZXlBcmddKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGxldCBydW5UYXNrID0gZnVuY3Rpb24odGFza0FyZzpUYXNrLG9wdGlvbnNBcmc6e3RvdWNoZWRUYXNrc0FycmF5OlRhc2tbXX0gPSB7dG91Y2hlZFRhc2tzQXJyYXk6W119KXtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMuUS5kZWZlcigpO1xuICAgIHVwZGF0ZVRhc2tTdGF0dXModGFza0FyZyxcInJ1bm5pbmdcIik7XG4gICAgZG9uZS5wcm9taXNlLnRoZW4oZnVuY3Rpb24oKXt1cGRhdGVUYXNrU3RhdHVzKHRhc2tBcmcsXCJpZGxlXCIpfSlcbiAgICBsZXQgbG9jYWxEZWZlcnJlZCA9IHBsdWdpbnMuUS5kZWZlcigpO1xuICAgIGxldCB0b3VjaGVkVGFza3NBcnJheTpUYXNrW107XG4gICAgaWYob3B0aW9uc0FyZy50b3VjaGVkVGFza3NBcnJheSl7XG4gICAgICAgIHRvdWNoZWRUYXNrc0FycmF5ID0gb3B0aW9uc0FyZy50b3VjaGVkVGFza3NBcnJheTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b3VjaGVkVGFza3NBcnJheSA9IFtdO1xuICAgIH1cbiAgICB0b3VjaGVkVGFza3NBcnJheS5wdXNoKHRhc2tBcmcpO1xuICAgIGxvY2FsRGVmZXJyZWQucHJvbWlzZVxuICAgICAgICAudGhlbigoKSA9PntcbiAgICAgICAgICAgIGlmKHRhc2tBcmcucHJlVGFzayAmJiAhaXNUYXNrVG91Y2hlZCh0YXNrQXJnLnByZVRhc2ssdG91Y2hlZFRhc2tzQXJyYXkpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVuVGFzayh0YXNrQXJnLnByZVRhc2sse3RvdWNoZWRUYXNrc0FycmF5OnRvdWNoZWRUYXNrc0FycmF5fSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRvbmUyID0gcGx1Z2lucy5RLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgZG9uZTIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lMi5wcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGFza0FyZy50YXNrKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmKHRhc2tBcmcuYWZ0ZXJUYXNrICYmICFpc1Rhc2tUb3VjaGVkKHRhc2tBcmcuYWZ0ZXJUYXNrLHRvdWNoZWRUYXNrc0FycmF5KSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1blRhc2sodGFza0FyZy5hZnRlclRhc2sse3RvdWNoZWRUYXNrc0FycmF5OnRvdWNoZWRUYXNrc0FycmF5fSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRvbmUyID0gcGx1Z2lucy5RLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgZG9uZTIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lMi5wcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgbG9jYWxEZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn07XG5cbmV4cG9ydCBsZXQgcnVuQnVmZmVyZWRUYXNrID0gKHRhc2tBcmc6VGFzaykgPT4ge1xuICAgIGxldCByZWN1cnNpdmVCdWZmZXJSdW5uZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKHRhc2tBcmcuYnVmZmVyQ291bnRlciA+IDApe1xuICAgICAgICAgICAgdGFza0FyZy5idWZmZXJDb3VudGVyLS07XG4gICAgICAgICAgICBydW5UYXNrKHRhc2tBcmcpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVjdXJzaXZlQnVmZmVyUnVubmVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGxldCB1cGRhdGVUYXNrU3RhdHVzID0gKHRhc2tBcmcsc3RhdHVzQXJnOnN0cmluZykgPT4ge1xuICAgIHN3aXRjaCAoc3RhdHVzQXJnKSB7XG4gICAgICAgIGNhc2UgXCJydW5uaW5nXCI6XG4gICAgICAgICAgICB0YXNrQXJnLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGFza0FyZy5pZGxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImlkbGVcIjpcbiAgICAgICAgICAgIHRhc2tBcmcucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGFza0FyZy5pZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3RhdHVzIG5vdCByZWNvZ25pc2VkXCIpO1xuICAgIH1cbn0iXX0=
