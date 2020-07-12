import * as plugins from './taskbuffer.plugins';

import { Task, ITaskFunction } from './taskbuffer.classes.task';

/**
 * TaskOnce is run exactly once, no matter how often it is triggered
 */
export class TaskOnce extends Task {
  hasTriggered: boolean = false;
  constructor(optionsArg: { name?: string; taskFunction: ITaskFunction }) {
    super({
      name: optionsArg.name,
      taskFunction: async () => {
        if (!this.hasTriggered) {
          this.hasTriggered = true;
          await optionsArg.taskFunction();
        }
      },
    });
  }
}
