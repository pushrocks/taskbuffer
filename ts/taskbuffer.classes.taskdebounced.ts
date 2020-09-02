import * as plugins from './taskbuffer.plugins';

import { Task, ITaskFunction } from './taskbuffer.classes.task';

export class TaskDebounced<T = unknown> extends Task {
  private _debouncedTaskFunction: ITaskFunction;
  private _observableIntake = new plugins.smartrx.ObservableIntake<T>();

  constructor(optionsArg: {
    name: string;
    taskFunction: ITaskFunction;
    debounceTimeInMillis: number;
  }) {
    super({
      name: optionsArg.name,
      taskFunction: async (x: T) => {
        this._observableIntake.push(x);
      },
    });
    this.taskFunction = optionsArg.taskFunction;
    this._observableIntake.observable
      .pipe(plugins.smartrx.rxjs.ops.debounceTime(optionsArg.debounceTimeInMillis))
      .subscribe((x) => {
        this.taskFunction(x);
      });
  }
}
