/// <reference path="./typings/main.d.ts" />
import plugins = require("./taskbuffer.plugins");
import task = require("./taskbuffer.task");
import taskchain = require("./taskbuffer.taskchain");

var taskbuffer = {
    task: task
};

export = taskbuffer;