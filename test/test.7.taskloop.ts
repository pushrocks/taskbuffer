import { tap, expect } from '@pushrocks/tapbundle';

import * as taskbuffer from '../ts';

let preTask: taskbuffer.Task;
let afterTask: taskbuffer.Task;

let mainTask: taskbuffer.Task;

tap.test('should create tasks', async () => {
  preTask = new taskbuffer.Task({
    name: 'myPreTask',
    taskFunction: async () => {
      console.log('pretask executed :)');
      return 'hi';
    }
  });
  afterTask = new taskbuffer.Task({
    name: 'myAfterTask',
    taskFunction: async x => {
      if (x === 'hi') {
        console.log('afterTask: values get passed along alright');
      }
      console.log('afterTask executed :)');
      return x;
    },
    preTask,
    afterTask
  });

  mainTask = new taskbuffer.Task({
    name: 'mainTask',
    taskFunction: async x => {
      if (x === 'hi') {
        console.log('mainTask: values get passed along alright');
      }
      console.log('afterTask executed :)');
      return x;
    },
    preTask: () => {
      return preTask;
    },
    afterTask
  });
});

tap.test('should execute the mainTask', async () => {
  await mainTask.trigger();
});

tap.start();
