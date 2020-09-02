import * as plugins from './taskbuffer.plugins';
import { Task } from './taskbuffer.classes.task';
import { threadId } from 'worker_threads';

export interface ICronJob {
  cronString: string;
  taskNameArg: string;
  job: any;
}

export class TaskManager {
  public taskMap = new plugins.lik.ObjectMap<Task>();
  private cronJobManager = new plugins.smarttime.CronManager();

  constructor() {
    // nothing here
  }

  /**
   * checks if a task is already present
   * @param taskNameArg
   */
  public getTaskByName(taskNameArg): Task {
    return this.taskMap.find((itemArg) => {
      return itemArg.name === taskNameArg;
    });
  }

  /**
   * adds a Task to the TaskManager
   * @param taskArg
   */
  public addTask(taskArg: Task): void {
    if (!taskArg.name) {
      throw new Error('taskArg needs a name to be added to taskManager');
    }
    this.taskMap.add(taskArg);
  }

  /**
   * adds and schedules a task at once
   * @param taskArg
   * @param cronStringArg
   */
  public addAndScheduleTask(taskArg: Task, cronStringArg: string) {
    this.addTask(taskArg);
    const taskName = taskArg.name;
    this.scheduleTaskByName(taskName, cronStringArg);
  }

  /**
   * triggers a task in the TaskManagerByName
   * @param taskNameArg
   */
  public triggerTaskByName(taskNameArg: string): Promise<any> {
    const taskToTrigger = this.getTaskByName(taskNameArg);
    if (!taskToTrigger) {
      throw new Error(`There is no task with the name of ${taskNameArg}`);
    }
    return taskToTrigger.trigger();
  }

  public async triggerTask(task: Task) {
    return task.trigger();
  }

  /**
   * schedules the task by name
   * @param taskNameArg
   */
  public scheduleTaskByName(taskNameArg: string, cronStringArg: string) {
    const taskToSchedule = this.getTaskByName(taskNameArg);
    const cronJob = this.cronJobManager.addCronjob(cronStringArg, async () => {
      await taskToSchedule.triggerBuffered();
    });
    taskToSchedule.cronJob = cronJob;
  }

  /**
   * deschedules a task by name
   * @param taskNameArg
   */
  public descheduleTaskByName(taskNameArg: string) {
    const taskToDeSchedule = this.getTaskByName(taskNameArg);
    if (taskToDeSchedule.cronJob) {
      this.cronJobManager.removeCronjob(taskToDeSchedule.cronJob);
      taskToDeSchedule.cronJob = null;
    }
    if (this.cronJobManager.cronjobs.isEmpty) {
      this.cronJobManager.stop();
    }
  }

  /**
   * deschedules a task
   * @param task
   */
  public async descheduleTask(task: Task) {
    await this.descheduleTaskByName(task.name);
  }
  /**
   * returns all schedules of a specific task
   * @param taskNameArg
   */
  public getSchedulesForTaskName(taskNameArg: string) {}

  /**
   * starts the taskmanager
   */
  public start() {
    this.cronJobManager.start();
  }

  /**
   * stops the taskmanager
   */
  public stop() {
    this.cronJobManager.stop();
  }
}
