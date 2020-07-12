import * as plugins from './taskbuffer.plugins';
import { Task } from './taskbuffer.classes.task';

export class Taskparallel extends Task {
  public taskArray: Task[];
  constructor(optionsArg: { taskArray: Task[] }) {
    const options = {
      ...optionsArg,
      ...{
        taskFunction: () => {
          const done = plugins.smartpromise.defer();
          const promiseArray: Promise<any>[] = []; // stores promises of all tasks, since they run in parallel
          this.taskArray.forEach(function (taskArg) {
            promiseArray.push(taskArg.trigger());
          });
          Promise.all(promiseArray).then(done.resolve);
          return done.promise;
        },
      },
    };
    super(options);
    this.taskArray = optionsArg.taskArray;
  }
}
