# taskbuffer
Flexible task organization for gulp.

## Status
[![Coverage Status](https://coveralls.io/repos/github/pushrocks/taskbuffer/badge.svg?branch=master)](https://coveralls.io/github/pushrocks/taskbuffer?branch=master)

## Install

```sh
npm install taskbuffer --save
```

## Concepts 

#### Task
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

#### Taskchain
* Multiple Tasks can be combined in a bigger task using a Taskchain. Taskchain extends Task.

