"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./taskbuffer.plugins");
class TaskManager {
    constructor() {
        this.taskMap = new plugins.lik.Objectmap();
        this.cronJobMap = new plugins.lik.Objectmap();
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
        return taskToTrigger.trigger();
    }
    /**
     * schedules the task by name
     * @param taskNameArg
     */
    scheduleTaskByName(taskNameArg, cronStringArg) {
        let taskToSchedule = this.getTaskByName(taskNameArg);
        let job = new plugins.cron.CronJob({
            cronTime: cronStringArg,
            onTick: () => {
                this.triggerTaskByName(taskNameArg);
            },
            start: true
        });
        this.cronJobMap.add({
            taskNameArg: taskToSchedule.name,
            cronString: cronStringArg,
            job: job
        });
    }
    descheduleTaskByName(taskNameArg) {
        let descheduledCron = this.cronJobMap.findOneAndRemove((itemArg) => {
            return itemArg.taskNameArg === taskNameArg;
        });
        descheduledCron.job.stop();
    }
    /**
     * returns all schedules of a specific task
     * @param taskNameArg
     */
    getSchedulesForTaskName(taskNameArg) {
    }
}
exports.TaskManager = TaskManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2ttYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFza2J1ZmZlci5jbGFzc2VzLnRhc2ttYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQStDO0FBTS9DO0lBR0U7UUFGQSxZQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBUSxDQUFBO1FBQ25DLGVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFZLENBQUE7UUFFeEQsZUFBZTtJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYSxDQUFFLFdBQVc7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTztZQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUE7UUFDckMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTyxDQUFFLE9BQWE7UUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUE7UUFDcEUsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsa0JBQWtCLENBQUUsT0FBYSxFQUFFLGFBQXFCO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBRSxXQUFtQjtRQUNwQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLENBQUM7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQkFBa0IsQ0FBRSxXQUFtQixFQUFFLGFBQXFCO1FBQzVELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxRQUFRLEVBQUUsYUFBYTtZQUN2QixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3JDLENBQUM7WUFDRCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1lBQ2xCLFdBQVcsRUFBRSxjQUFjLENBQUMsSUFBSTtZQUNoQyxVQUFVLEVBQUUsYUFBYTtZQUN6QixHQUFHLEVBQUUsR0FBRztTQUNULENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxvQkFBb0IsQ0FBRSxXQUFtQjtRQUN2QyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTztZQUM3RCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUE7UUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFDRixlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSCx1QkFBdUIsQ0FBRSxXQUFtQjtJQUU1QyxDQUFDO0NBQ0Y7QUFwRkQsa0NBb0ZDIn0=