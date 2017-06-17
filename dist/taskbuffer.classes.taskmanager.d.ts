import { Task } from './taskbuffer.classes.task';
import { Objectmap } from 'lik';
export declare class TaskManager {
    taskMap: Objectmap<Task>;
    private cronJobArray;
    constructor();
    /**
     * checks if a task is already present
     * @param taskNameArg
     */
    getTaskByName(taskNameArg: any): Task;
    /**
     * adds a Task to the TaskManager
     * @param taskArg
     */
    addTask(taskArg: Task): void;
    /**
     * adds and schedules a task at once
     * @param taskArg
     * @param cronStringArg
     */
    addAndScheduleTask(taskArg: Task, cronStringArg: string): void;
    /**
     * triggers a task in the TaskManagerByName
     * @param taskNameArg
     */
    triggerTaskByName(taskNameArg: string): void;
    /**
     * schedules the task by name
     * @param taskNameArg
     */
    scheduleTaskByName(taskNameArg: string, cronStringArg: string): void;
    /**
     * returns all schedules of a specific task
     * @param taskNameArg
     */
    getSchedulesForTaskName(taskNameArg: string): void;
}
export interface ICronJob {
    cronString: string;
    taskNameArg: string;
    job: any;
}
