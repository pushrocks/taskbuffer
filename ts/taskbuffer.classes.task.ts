import * as plugins from './taskbuffer.plugins';
import * as helpers from './taskbuffer.classes.helpers';

export interface ITaskFunction {
  (x?: any): PromiseLike<any>;
}

export class Task {
  // man datory properties
  name: string;
  taskFunction: ITaskFunction;
  buffered: boolean;

  bufferMax: number;
  execDelay: number;

  // tasks to run before and after
  preTask: Task;
  afterTask: Task;

  // initialize by default
  running: boolean = false;
  bufferRunner = new helpers.BufferRunner(this);
  cycleCounter = new helpers.CycleCounter(this);

  idle: boolean = true;
  private _state: string = 'ready';

  constructor(optionsArg: {
    /**
     * the task function to run, must return promise
     */
    taskFunction: ITaskFunction;
    /**
     * any other task to run before
     */
    preTask?: Task;
    /**
     * any other task to run after
     */
    afterTask?: Task;
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
  trigger(x?): Promise<any> {
    if (this.buffered) {
      return this.triggerBuffered(x);
    } else {
      return this.triggerUnBuffered(x);
    }
  }

  /**
   * trigger task unbuffered.
   */
  triggerUnBuffered(x?): Promise<any> {
    return helpers.runTask(this, { x: x });
  }

  /**
   * trigger task buffered.
   */
  triggerBuffered(x?): Promise<any> {
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
