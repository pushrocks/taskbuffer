#!/usr/bin/env node

/// <reference path="./index.ts" />
var TaskbufferPlugins;
(function (TaskbufferPlugins) {
    TaskbufferPlugins.init = function () {
        var plugins = {
            q: require("q")
        };
    };
})(TaskbufferPlugins || (TaskbufferPlugins = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./index.ts" />
var Task = (function () {
    function Task(taskArg, optionsArg) {
        this.task = taskArg;
    }
    Task.prototype.trigger = function () { };
    ;
    Task.prototype.triggerBuffered = function () {
    };
    return Task;
})();
var TaskChain = (function (_super) {
    __extends(TaskChain, _super);
    function TaskChain(taskArrayArg) {
        _super.call(this, {
            task: function () { }
        });
    }
    return TaskChain;
})(Task);
/// <reference path="./index.ts" />
var TaskbufferTask;
(function (TaskbufferTask) {
    TaskbufferTask.init = function () {
        var task = function (taskArg, options) {
            var task = taskArg;
            return new Task(task, options);
        };
        return task;
    };
})(TaskbufferTask || (TaskbufferTask = {}));
/// <reference path="./index.ts" />
var TaskbufferTaskchain;
(function (TaskbufferTaskchain) {
    TaskbufferTaskchain.init = function () {
        var taskChain = function (taskArrayArg) {
            return new TaskChain();
        };
        return taskChain();
    };
})(TaskbufferTaskchain || (TaskbufferTaskchain = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./taskbuffer.plugins.ts" />
/// <reference path="./taskbuffer.classes.ts" />
/// <reference path="./taskbuffer.task.ts" />
/// <reference path="./taskbuffer.taskchain.ts" />
var plugins = TaskbufferPlugins.init();
