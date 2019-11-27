import * as plugins from './taskbuffer.plugins';

import { Task } from './taskbuffer.classes.task';

export class TaskRunner {
  public maxParrallelJobs: number = 1;
  public status: 'stopped' | 'running' = 'stopped';
  public runningTasks: plugins.lik.Objectmap<Task> = new plugins.lik.Objectmap<Task>();
  public qeuedTasks: Task[] = [];

  /**
   * adds a task to the qeue
   */
  public addTask(taskArg: Task) {
    this.qeuedTasks.push(taskArg);
  }

  /**
   * set amount of parallel tasks
   * be careful, you might loose dependability of tasks
   */
  public setMaxParallelJobs(maxParrallelJobsArg: number) {
    this.maxParrallelJobs = maxParrallelJobsArg;
  }

  /**
   * starts the task queue
   */
  public start() {
    this.status = 'running';
  }

  public async checkExecution() {
    if (this.runningTasks.getArray().length < this.maxParrallelJobs) {
      const nextJob = this.qeuedTasks.shift();
      this.runningTasks.add(nextJob);
      await nextJob.trigger();

    }
  }

  /**
   * stops the task queue
   */
  public stop() {
    this.status = 'stopped';
  };
}
