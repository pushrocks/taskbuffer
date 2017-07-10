# taskbuffer
flexible task management. TypeScript ready!

## Availabililty
[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/taskbuffer)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/taskbuffer)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/taskbuffer)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/taskbuffer/)

## Status for master
[![build status](https://GitLab.com/pushrocks/taskbuffer/badges/master/build.svg)](https://GitLab.com/pushrocks/taskbuffer/commits/master)
[![coverage report](https://GitLab.com/pushrocks/taskbuffer/badges/master/coverage.svg)](https://GitLab.com/pushrocks/taskbuffer/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/taskbuffer.svg)](https://www.npmjs.com/package/taskbuffer)
[![Dependency Status](https://david-dm.org/pushrocks/taskbuffer.svg)](https://david-dm.org/pushrocks/taskbuffer)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/taskbuffer/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/taskbuffer/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/taskbuffer/badges/code.svg)](https://www.bithound.io/github/pushrocks/taskbuffer)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

```sh
npm install taskbuffer --save
```

## Concepts 

### class `Task`
* A Task in its most simple form is a function that is executed when the task runs.
* A Task can have a **preTask** and an **afterTask**
  (those are run before or after the main function whenever the task is called)
* A Task can be buffered.
  That means it can be called multiple times in a very short time.
  However execution happens in line:
  meaning execution of the task's main function is on halt until the previous task call has finished.
  You can set bufferMax number, which is the max number of buffered task calls.
  Any additional calls will then be truncated
* Task.trigger() and Task.triggerBuffered() always return a Promise
  which is fullfilled once the related task call has completed.
* Task.triggered() is an Observable stream that emits events every time a task call is called and every time a call is completed.
* Task is compatible to gulp streams.

### class `TaskChain`
* TaskChain extends Task.
* Multiple Tasks can be combined in a bigger task using a TaskChain.
* While the tasks are async in themselve, TaskChain **runs Tasks serialized** (one after the other)
* that means that tasks can rely on each other and 

### class `TaskParallel`
* TaskParallel extends Task.
* like TaskChain, however **tasks run in parallel**
* Tasks cannot rely on each other.

### Usage
We highly recommend TypeScript as this module supports **TypeScript intellisense**.
```javascript
import * as taskbuffer from "taskbuffer";

myTask = new taskbuffer.Task({
  preTask: someOtherTask // optional, don't worry loops are prevented
  afterTask: someOtherTask // optional, don't worry loops are prevented
  name:"myTask1",
  buffered: true, // optional
  bufferMax: 3, // optional, call qeues greater than this are truncated
  execDelay: 1000, // optional, time in ms to wait before executing task call
  taskFunction:() => {
    // do some stuff and return promise
    // pass on any data through promise resolution
    // Use TypeScript for better understanding and code completion
  }
})
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
