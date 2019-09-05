import { expect, tap } from '@pushrocks/tapbundle';
import taskbuffer = require('../ts/index');
import * as smartdelay from '@pushrocks/smartdelay';

let task1Executed = false;
const task1 = new taskbuffer.Task({
  taskFunction: async () => {
    await smartdelay.delayFor(2000);
    task1Executed = true;
  }
});

let task2Executed = false;
const task2 = new taskbuffer.Task({
  taskFunction: async () => {
    await smartdelay.delayFor(2000);
    task2Executed = true;
  }
});

let task3Executed = false;
const task3 = new taskbuffer.Task({
  taskFunction: async () => {
    await smartdelay.delayFor(2000);
    task3Executed = true;
  }
});

tap.test('expect run in Parallel', async () => {
  const testTaskparallel = new taskbuffer.Taskparallel({
    taskArray: [task1, task2, task3]
  });
  await testTaskparallel.trigger();
});

tap.start();
