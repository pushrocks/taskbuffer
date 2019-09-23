import * as plugins from './taskbuffer.plugins';
import * as helpers from './taskbuffer.classes.helpers';
import { BufferRunner } from './taskbuffer.classes.bufferrunner';
import { CycleCounter } from './taskbuffer.classes.cyclecounter';

export interface ITaskFunction {
  (x?: any): PromiseLike<any>;
}

export type TPreOrAfterTaskFunction = () => Task;

export class Task {
  // STATIC
  public static extractTask(preOrAfterTaskArg: Task | TPreOrAfterTaskFunction): Task {
    switch(true) {
      case (!preOrAfterTaskArg):
        return null;
      case (preOrAfterTaskArg instanceof Task):
        return preOrAfterTaskArg as Task;
      case typeof preOrAfterTaskArg === "function":
        const taskFunction = preOrAfterTaskArg as TPreOrAfterTaskFunction;
        return taskFunction();
      default:
        return null;
    }
  }


  public static emptyTaskFunction: ITaskFunction = function(x) {
    const done = plugins.smartpromise.defer();
    done.resolve();
    return done.promise;
  };
  
  public static isTask = (taskArg: Task): boolean => {
    if (taskArg instanceof Task && typeof taskArg.taskFunction === 'function') {
      return true;
    } else {
      return false;
    }
  };
  
  public static isTaskTouched = (taskArg: Task | TPreOrAfterTaskFunction, touchedTasksArray: Task[]): boolean => {
    const taskToCheck = Task.extractTask(taskArg);
    let result = false;
    for (const keyArg in touchedTasksArray) {
      if (taskToCheck === touchedTasksArray[keyArg]) {
        result = true;
      }
    }
    return result;
  };
  
  public static runTask = async (taskArg: Task | TPreOrAfterTaskFunction, optionsArg: { x?; touchedTasksArray?: Task[] }) => {
    const taskToRun = Task.extractTask(taskArg);
    const done = plugins.smartpromise.defer();
  
    // pay respect to execDelay
    if (taskToRun.execDelay) {
      await plugins.smartdelay.delayFor(taskToRun.execDelay);
    }
  
    //  set running params
    taskToRun.running = true;
  
    done.promise.then(async () => {
      taskToRun.running = false;
    });
  
    // handle options
    const options = {
      ...{ x: undefined, touchedTasksArray: [] },
      ...optionsArg
    };
    const x = options.x;
    const touchedTasksArray: Task[] = options.touchedTasksArray;
  
    touchedTasksArray.push(taskToRun);
  
    // run the task cascade
    const localDeferred = plugins.smartpromise.defer();
    localDeferred.promise
      .then(() => {
        // lets run any preTask
        
        if (taskToRun.preTask && !Task.isTaskTouched(taskToRun.preTask, touchedTasksArray)) {
          return Task.runTask(taskToRun.preTask, { x, touchedTasksArray });
        } else {
          const done2 = plugins.smartpromise.defer();
          done2.resolve(x);
          return done2.promise;
        }
      })
      .then(async x => {
        // lets run the main task
        try {
          return await taskToRun.taskFunction(x);
        } catch (e) {
          console.log(e);
        }
      })
      .then(x => {
        if (taskToRun.afterTask && !Task.isTaskTouched(taskToRun.afterTask, touchedTasksArray)) {
          return Task.runTask(taskToRun.afterTask, { x: x, touchedTasksArray: touchedTasksArray });
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
  }

  // INSTANCE
  // man datory properties
  public name: string;
  public taskFunction: ITaskFunction;
  public buffered: boolean;

  public bufferMax: number;
  public execDelay: number;

  // tasks to run before and after
  public preTask: Task | TPreOrAfterTaskFunction;
  public afterTask: Task | TPreOrAfterTaskFunction;

  // initialize by default
  public running: boolean = false;
  public bufferRunner = new BufferRunner(this);
  public cycleCounter = new CycleCounter(this);

  public idle: boolean = true;
  private _state: string = 'ready';

  constructor(optionsArg: {
    /**
     * the task function to run, must return promise
     */
    taskFunction: ITaskFunction;
    /**
     * any other task to run before
     */
    preTask?: Task | TPreOrAfterTaskFunction;
    /**
     * any other task to run after
     */
    afterTask?: Task | TPreOrAfterTaskFunction;
    /**
     * wether this task should run buffered
     */
    buffered?: boolean;
    /**
     * the maximum buffer
     */
    bufferMax?: number;
    /**
     * the execution delay, before the task is executed
     * only makes sense when running in buffered mode
     */
    execDelay?: number;
    /**
     * the name of the task
     */
    name?: string;
  }) {
    this.taskFunction = optionsArg.taskFunction;
    this.preTask = optionsArg.preTask;
    this.afterTask = optionsArg.afterTask;
    this.idle = !this.running;
    this.buffered = optionsArg.buffered;
    this.bufferMax = optionsArg.bufferMax;
    this.execDelay = optionsArg.execDelay;
    this.name = optionsArg.name;
  }

  /**
   * trigger the task. Will trigger buffered if this.buffered is true
   */
  public trigger(x?): Promise<any> {
    if (this.buffered) {
      return this.triggerBuffered(x);
    } else {
      return this.triggerUnBuffered(x);
    }
  }

  /**
   * trigger task unbuffered.
   */
  public triggerUnBuffered(x?): Promise<any> {
    return Task.runTask(this, { x: x });
  }

  /**
   * trigger task buffered.
   */
  public triggerBuffered(x?): Promise<any> {
    return this.bufferRunner.trigger(x);
  }

  get state(): string {
    return this._state;
  }

  set state(stateArg: string) {
    if (stateArg === 'locked') {
      this._state = 'locked';
    } else {
      plugins.smartlog.defaultLogger.log('error', 'state type ' + stateArg + ' could not be set');
    }
  }
}
