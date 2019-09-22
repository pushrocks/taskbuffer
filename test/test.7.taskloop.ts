import { tap, expect } from '@pushrocks/tapbundle';

import * as taskbuffer from  '../ts';

let preTask: taskbuffer.Task;
let afterTask: taskbuffer.Task;

let mainTask: taskbuffer.Task;

tap.test('should create tasks', async () => {
  preTask = new taskbuffer.Task({
    name: 'myPreTask',
    taskFunction: async () => {
      console.log('pretask executed :)');
    }
  });
  afterTask = new taskbuffer.Task({
    name: 'myAfterTask',
    taskFunction: async () => {
      console.log('afterTask executed :)');
    },
    preTask,
    afterTask
  });

  mainTask = new taskbuffer.Task({
    name: 'mainTask',
    taskFunction: async () => {
      console.log('main task executed');
    },
    preTask,
    afterTask
  });
});

tap.test('should execute the mainTasj', async () => {
  await mainTask.trigger();
});

tap.start();