import { expect, tap } from '@pushrocks/tapbundle';
import taskbuffer = require('../ts/index');

import * as smartpromise from '@pushrocks/smartpromise';
import * as smartdelay from '@pushrocks/smartdelay';

const flowTask1 = new taskbuffer.Task({
  taskFunction: (x: number) => {
    const done = smartpromise.defer();
    console.log('flowTask1');
    console.log(x);
    done.resolve(x);
    return done.promise;
  },
});

const flowTaskBuffered = new taskbuffer.Task({
  taskFunction: (x: number) => {
    const done = smartpromise.defer();
    console.log('flowTask1');
    console.log(x);
    done.resolve(x);
    return done.promise;
  },
  buffered: true,
  bufferMax: 1,
});

const flowTask2 = new taskbuffer.Task({
  taskFunction: (x: number) => {
    const done = smartpromise.defer();
    console.log('flowTask2');
    console.log(x);
    done.resolve(x);
    return done.promise;
  },
  preTask: flowTask1,
});

const flowTask3 = new taskbuffer.Taskchain({
  taskArray: [flowTask1, flowTask2],
});

tap.test('should let a value flow through a task', async () => {
  const result = await flowTask1.trigger(12);
  expect(result).to.equal(12);
});

tap.test('expect values to flow between tasks', async () => {
  const result = await flowTask2.trigger(12);
  expect(result).to.equal(12);
});

tap.test('expect values to flow between tasks when buffered', async () => {
  const result = await flowTaskBuffered.trigger(12);
  expect(result).to.equal(12);
});

tap.test('expect values to flow between tasks in Taskchain', async () => {
  const result = await flowTask3.trigger(12);
  expect(result).to.equal(12);
});

tap.start();
