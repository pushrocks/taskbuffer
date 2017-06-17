import * as plugins from './taskbuffer.plugins'
import { Task } from './taskbuffer.classes.task'

// interfaces
import { Objectmap } from 'lik'

export class TaskManager {
  taskMap = new plugins.lik.Objectmap<Task>()
  private cronJobArray: ICronJob[] = []
  constructor () {
    // nothing here
  }

  /**
   * checks if a task is already present
   * @param taskNameArg
   */
  getTaskByName (taskNameArg): Task {
    return this.taskMap.find((itemArg) => {
      return itemArg.name === taskNameArg
    })
  }

  /**
   * adds a Task to the TaskManager
   * @param taskArg
   */
  addTask (taskArg: Task): void {
    if (!taskArg.name) {
      throw new Error('taskArg needs a name to be added to taskManager')
    }
    this.taskMap.add(taskArg)
  }

  /**
   * adds and schedules a task at once
   * @param taskArg
   * @param cronStringArg
   */
  addAndScheduleTask (taskArg: Task, cronStringArg: string) {
    this.addTask(taskArg)
    let taskName = taskArg.name
    this.scheduleTaskByName(taskName, cronStringArg)
  }

  /**
   * triggers a task in the TaskManagerByName
   * @param taskNameArg
   */
  triggerTaskByName (taskNameArg: string) {
    let taskToTrigger = this.getTaskByName(taskNameArg)
    if (!taskToTrigger) {
      throw new Error(`There is no task with the name of ${taskNameArg}`)
    }
    taskToTrigger.trigger()
  }

  /**
   * schedules the task by name
   * @param taskNameArg
   */
  scheduleTaskByName (taskNameArg: string, cronStringArg: string) {
    let taskToSchedule = this.getTaskByName(taskNameArg)
    let job = new plugins.cron.CronJob({
      cronTime: cronStringArg,
      onTick: taskToSchedule.trigger,
      start: true
    })
    this.cronJobArray.push({
      taskNameArg: taskToSchedule.name,
      cronString: cronStringArg,
      job: job
    })
  }

  /**
   * returns all schedules of a specific task
   * @param taskNameArg
   */
  getSchedulesForTaskName (taskNameArg: string) {

  }
}

export interface ICronJob {
  cronString: string
  taskNameArg: string
  job: any
}
