import { expect, tap } from '@pushrocks/tapbundle';
import taskbuffer = require('../ts/index');

import * as smartpromise from '@pushrocks/smartpromise';
import * as smartdelay from '@pushrocks/smartdelay';

let myTaskManager: taskbuffer.TaskManager;
let taskRunCounter = 0;
let taskDone = smartpromise.defer();

tap.test('should create an instance of TaskManager', async () => {
  myTaskManager = new taskbuffer.TaskManager();
  expect(myTaskManager).to.be.instanceof(taskbuffer.TaskManager);
});

tap.test('should run the task as expected', async () => {
  let referenceBoolean = false;
  myTaskManager.addTask(
    new taskbuffer.Task({
      name: 'myTask',
      taskFunction: async () => {
        console.log('Task executed!');
        referenceBoolean = true;
        taskRunCounter++;
        if (taskRunCounter === 10) {
          taskDone.resolve();
        }
      }
    })
  );
  await myTaskManager.triggerTaskByName('myTask');
  // tslint:disable-next-line:no-unused-expression
  expect(referenceBoolean).to.be.true;
});

tap.test('should schedule task', async () => {
  myTaskManager.scheduleTaskByName('myTask', '* * * * * *');
  await taskDone.promise;
  myTaskManager.descheduleTaskByName('myTask');
});

tap.start();
