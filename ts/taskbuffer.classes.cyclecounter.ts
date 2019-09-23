import * as plugins from './taskbuffer.plugins';
import { Task } from './taskbuffer.classes.task';

export interface ICycleObject {
  cycleCounter: number;
  deferred: plugins.smartpromise.Deferred<any>;
}

export class CycleCounter {
  public task: Task;
  public cycleObjectArray: ICycleObject[] = [];
  constructor(taskArg: Task) {
    this.task = taskArg;
  }
  public getPromiseForCycle(cycleCountArg: number) {
    const done = plugins.smartpromise.defer();
    const cycleObject: ICycleObject = {
      cycleCounter: cycleCountArg,
      deferred: done
    };
    this.cycleObjectArray.push(cycleObject);
    return done.promise;
  }
  public informOfCycle(x) {
    const newCycleObjectArray: ICycleObject[] = [];
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
