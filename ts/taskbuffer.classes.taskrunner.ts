import * as plugins from './taskbuffer.plugins';

import { Task } from './taskbuffer.classes.task';

export class TaskRunner {
  public maxParrallelJobs: number = 1;
  public status: 'stopped' | 'running' = 'stopped';
  public runningTasks: plugins.lik.Objectmap<Task> = new plugins.lik.Objectmap<Task>();
  public qeuedTasks: Task[] = [];

  constructor() {
    this.runningTasks.eventSubject.subscribe(async eventArg => {
      this.checkExecution();
    });
  }

  /**
   * adds a task to the qeue
   */
  public addTask(taskArg: Task) {
    this.qeuedTasks.push(taskArg);
    this.checkExecution();
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

  /**
   * checks wether execution is on point
   */
  public async checkExecution() {
    if (
      this.runningTasks.getArray().length < this.maxParrallelJobs &&
      this.status === 'running' &&
      this.qeuedTasks.length > 0
    ) {
      const nextJob = this.qeuedTasks.shift();
      this.runningTasks.add(nextJob);
      await nextJob.trigger();
      this.runningTasks.remove(nextJob);
      this.checkExecution();
    }
  }

  /**
   * stops the task queue
   */
  public stop() {
    this.status = 'stopped';
  }
}
