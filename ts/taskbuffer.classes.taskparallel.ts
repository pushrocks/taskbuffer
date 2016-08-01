import * as plugins from "./taskbuffer.plugins"
import * as helpers from "./taskbuffer.classes.helpers"
import { Task } from "./taskbuffer.classes.task"

export class Taskparallel extends Task {
    taskArray: Task[];
    constructor(optionsArg: {
        taskArray: Task[]
    }){
        let options = plugins.lodash.merge(
            optionsArg,
            {
                taskFunction: () => {
                    let done = plugins.Q.defer();
                    let promiseArray:PromiseLike<any>[] = []; // stores promises of all tasks, since they run in parallel
                    this.taskArray.forEach(function (taskArg) {
                        promiseArray.push(taskArg.trigger());
                    })
                    plugins.Q.all(promiseArray)
                        .then(done.resolve);
                    return done.promise;
                }
            }
        );
        super(options);
        this.taskArray = optionsArg.taskArray;
    }
}

