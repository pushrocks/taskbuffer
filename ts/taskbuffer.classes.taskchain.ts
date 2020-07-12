// TaskChain chains tasks
// and extends Task

import * as plugins from './taskbuffer.plugins';
import { Task } from './taskbuffer.classes.task';
import { logger } from './taskbuffer.logging';

export class Taskchain extends Task {
  taskArray: Task[];
  constructor(optionsArg: {
    taskArray: Task[];
    name?: string;
    log?: boolean;
    buffered?: boolean;
    bufferMax?: number;
  }) {
    const options = {
      ...{
        name: 'unnamed Taskchain',
        log: false,
      },
      ...optionsArg,
      ...{
        taskFunction: (x: any) => {
          // this is the function that gets executed when TaskChain is triggered
          const done = plugins.smartpromise.defer(); // this is the starting Deferred object
          let taskCounter = 0; // counter for iterating async over the taskArray
          const iterateTasks = (x) => {
            if (typeof this.taskArray[taskCounter] !== 'undefined') {
              console.log(this.name + ' running: Task' + this.taskArray[taskCounter].name);
              this.taskArray[taskCounter].trigger(x).then((x) => {
                logger.log('info', this.taskArray[taskCounter].name);
                taskCounter++;
                iterateTasks(x);
              });
            } else {
              console.log('Taskchain "' + this.name + '" completed successfully');
              done.resolve(x);
            }
          };
          iterateTasks(x);
          return done.promise;
        },
      },
    };
    super(options);
    this.taskArray = optionsArg.taskArray;
  }
  addTask(taskArg: Task) {
    this.taskArray.push(taskArg);
  }
  removeTask(taskArg: Task) {
    // TODO:
  }
  shiftTask() {
    // TODO:
  }
}
