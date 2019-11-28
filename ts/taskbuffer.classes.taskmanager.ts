import * as plugins from './taskbuffer.plugins';
import { Task } from './taskbuffer.classes.task';

export interface ICronJob {
  cronString: string;
  taskNameArg: string;
  job: any;
}

export class TaskManager {
  public taskMap = new plugins.lik.Objectmap<Task>();
  private cronJobMap = new plugins.lik.Objectmap<ICronJob>();

  constructor() {
    // nothing here
  }

  /**
   * checks if a task is already present
   * @param taskNameArg
   */
  public getTaskByName(taskNameArg): Task {
    return this.taskMap.find(itemArg => {
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
    const job = new plugins.cron.CronJob({
      cronTime: cronStringArg,
      onTick: () => {
        this.triggerTaskByName(taskNameArg);
      },
      start: true
    });
    this.cronJobMap.add({
      taskNameArg: taskToSchedule.name,
      cronString: cronStringArg,
      job
    });
  }

  /**
   * deschedules a task by name
   * @param taskNameArg
   */
  public descheduleTaskByName(taskNameArg: string) {
    const descheduledCron = this.cronJobMap.findOneAndRemove(itemArg => {
      return itemArg.taskNameArg === taskNameArg;
    });
    descheduledCron.job.stop();
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
}
