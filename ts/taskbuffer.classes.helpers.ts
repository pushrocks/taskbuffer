import plugins = require('./taskbuffer.plugins');
import { Task, ITaskFunction } from './taskbuffer.classes.task';

export const emptyTaskFunction: ITaskFunction = function(x) {
  const done = plugins.smartpromise.defer();
  done.resolve();
  return done.promise;
};

export const isTask = (taskArg: Task): boolean => {
  if (taskArg instanceof Task && typeof taskArg.taskFunction === 'function') {
    return true;
  } else {
    return false;
  }
};

export const isTaskTouched = (taskArg: Task, touchedTasksArray: Task[]): boolean => {
  let result = false;
  for (const keyArg in touchedTasksArray) {
    if (taskArg === touchedTasksArray[keyArg]) {
      result = true;
    }
  }
  return result;
};

export const runTask = async (taskArg: Task, optionsArg: { x?; touchedTasksArray?: Task[] }) => {
  const done = plugins.smartpromise.defer();

  // pay respect to execDelay
  if (taskArg.execDelay) {
    await plugins.smartdelay.delayFor(taskArg.execDelay);
  }

  //  set running params
  taskArg.running = true;

  done.promise.then(async () => {
    taskArg.running = false;
  });

  // handle options
  const options = {
    ...{ x: undefined, touchedTasksArray: [] },
    ...optionsArg
  };
  const x = options.x;
  const touchedTasksArray: Task[] = options.touchedTasksArray;

  touchedTasksArray.push(taskArg);

  // run the task cascade
  const localDeferred = plugins.smartpromise.defer();
  localDeferred.promise
    .then(() => {
      // lets run any preTask
      if (taskArg.preTask && !isTaskTouched(taskArg.preTask, touchedTasksArray)) {
        return runTask(taskArg.preTask, { x, touchedTasksArray });
      } else {
        const done2 = plugins.smartpromise.defer();
        done2.resolve(x);
        return done2.promise;
      }
    })
    .then(async x => {
      // lets run the main task
      try {
        return await taskArg.taskFunction(x);
      } catch (e) {
        console.log(e);
      }
    })
    .then(x => {
      if (taskArg.afterTask && !isTaskTouched(taskArg.afterTask, touchedTasksArray)) {
        return runTask(taskArg.afterTask, { x: x, touchedTasksArray: touchedTasksArray });
      } else {
        const done2 = plugins.smartpromise.defer();
        done2.resolve(x);
        return done2.promise;
      }
    })
    .then(x => {
      done.resolve(x);
    })
    .catch(err => {
      console.log(err);
    });
  localDeferred.resolve();
  return await done.promise;
};

export interface cycleObject {
  cycleCounter: number;
  deferred: plugins.smartpromise.Deferred<any>;
}

export class CycleCounter {
  task: Task;
  cycleObjectArray: cycleObject[] = [];
  constructor(taskArg: Task) {
    this.task = taskArg;
  }
  getPromiseForCycle(cycleCountArg: number) {
    const done = plugins.smartpromise.defer();
    const cycleObject: cycleObject = {
      cycleCounter: cycleCountArg,
      deferred: done
    };
    this.cycleObjectArray.push(cycleObject);
    return done.promise;
  }
  informOfCycle(x) {
    const newCycleObjectArray: cycleObject[] = [];
    this.cycleObjectArray.forEach(cycleObjectArg => {
      cycleObjectArg.cycleCounter--;
      if (cycleObjectArg.cycleCounter <= 0) {
        cycleObjectArg.deferred.resolve(x);
      } else {
        newCycleObjectArray.push(cycleObjectArg);
      }
    });
    this.cycleObjectArray = newCycleObjectArray;
  }
}

export class BufferRunner {
  task: Task;
  // initialze by default
  bufferCounter: number = 0;
  running: boolean = false;
  constructor(taskArg: Task) {
    this.task = taskArg;
  }

  trigger(x): Promise<any> {
    if (!(this.bufferCounter >= this.task.bufferMax)) {
      this.bufferCounter++;
    }
    const returnPromise: Promise<any> = this.task.cycleCounter.getPromiseForCycle(
      this.bufferCounter + 1
    );
    if (!this.running) {
      this._run(x);
    }
    return returnPromise;
  }

  private _run(x) {
    const recursiveBufferRunner = x => {
      if (this.bufferCounter >= 0) {
        this.running = true;
        this.task.running = true;
        runTask(this.task, { x: x }).then(x => {
          this.bufferCounter--;
          this.task.cycleCounter.informOfCycle(x);
          recursiveBufferRunner(x);
        });
      } else {
        this.running = false;
        this.task.running = false;
      }
    };
    recursiveBufferRunner(x);
  }
}
