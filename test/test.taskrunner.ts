import { tap, expect } from '@pushrocks/tapbundle';
import * as taskbuffer from '../ts/index';

let testTaskRunner: taskbuffer.TaskRunner;

tap.test('should create a valid taskrunner', async () => {
  testTaskRunner = new taskbuffer.TaskRunner();
  testTaskRunner.start();
});

tap.test('should execute task when its scheduled', async (tools) => {
  const done = tools.defer();
  testTaskRunner.addTask(new taskbuffer.Task({
    taskFunction: async () => {
      console.log('hi');
    }
  }));

  testTaskRunner.addTask(new taskbuffer.Task({
    taskFunction: async () => {
      console.log('there');
      done.resolve();
    }
  }));

  await done.promise;
});

tap.start();