"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./taskbuffer.plugins");
class TaskManager {
    constructor() {
        this.taskMap = new plugins.lik.Objectmap();
        this.cronJobArray = [];
        // nothing here
    }
    /**
     * checks if a task is already present
     * @param taskNameArg
     */
    getTaskByName(taskNameArg) {
        return this.taskMap.find((itemArg) => {
            return itemArg.name === taskNameArg;
        });
    }
    /**
     * adds a Task to the TaskManager
     * @param taskArg
     */
    addTask(taskArg) {
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
    addAndScheduleTask(taskArg, cronStringArg) {
        this.addTask(taskArg);
        let taskName = taskArg.name;
        this.scheduleTaskByName(taskName, cronStringArg);
    }
    /**
     * triggers a task in the TaskManagerByName
     * @param taskNameArg
     */
    triggerTaskByName(taskNameArg) {
        let taskToTrigger = this.getTaskByName(taskNameArg);
        if (!taskToTrigger) {
            throw new Error(`There is no task with the name of ${taskNameArg}`);
        }
        taskToTrigger.trigger();
    }
    /**
     * schedules the task by name
     * @param taskNameArg
     */
    scheduleTaskByName(taskNameArg, cronStringArg) {
        let taskToSchedule = this.getTaskByName(taskNameArg);
        let job = new plugins.cron.CronJob({
            cronTime: cronStringArg,
            onTick: taskToSchedule.trigger,
            start: true
        });
        this.cronJobArray.push({
            taskNameArg: taskToSchedule.name,
            cronString: cronStringArg,
            job: job
        });
    }
    /**
     * returns all schedules of a specific task
     * @param taskNameArg
     */
    getSchedulesForTaskName(taskNameArg) {
    }
}
exports.TaskManager = TaskManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2ttYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFza2J1ZmZlci5jbGFzc2VzLnRhc2ttYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQStDO0FBTS9DO0lBR0U7UUFGQSxZQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBUSxDQUFBO1FBQ25DLGlCQUFZLEdBQWUsRUFBRSxDQUFBO1FBRW5DLGVBQWU7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBRSxXQUFXO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87WUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFBO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU8sQ0FBRSxPQUFhO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO1FBQ3BFLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQixDQUFFLE9BQWEsRUFBRSxhQUFxQjtRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsaUJBQWlCLENBQUUsV0FBbUI7UUFDcEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUNyRSxDQUFDO1FBQ0QsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQkFBa0IsQ0FBRSxXQUFtQixFQUFFLGFBQXFCO1FBQzVELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxRQUFRLEVBQUUsYUFBYTtZQUN2QixNQUFNLEVBQUUsY0FBYyxDQUFDLE9BQU87WUFDOUIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixXQUFXLEVBQUUsY0FBYyxDQUFDLElBQUk7WUFDaEMsVUFBVSxFQUFFLGFBQWE7WUFDekIsR0FBRyxFQUFFLEdBQUc7U0FDVCxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUJBQXVCLENBQUUsV0FBbUI7SUFFNUMsQ0FBQztDQUNGO0FBNUVELGtDQTRFQyJ9