import plugins = require("./taskbuffer.plugins");
import { Task, ITaskFunction } from "./taskbuffer.classes.task";

export let emptyTaskFunction: ITaskFunction = function () {
    let done = plugins.Q.defer();
    done.resolve();
    return done.promise;
};

export let isTask = function (taskArg): boolean {
    if (
        taskArg instanceof Task
        && typeof taskArg.task === "function"
    ) {
        return true;
    } else {
        return false;
    }
};


export let isTaskTouched = (taskArg: Task, touchedTasksArray: Task[]): boolean => {
    let result = false;
    for (let keyArg in touchedTasksArray) {
        if (taskArg === touchedTasksArray[keyArg]) {
            result = true;
        }
    }
    return result;
}

export let runTask = function (taskArg: Task, optionsArg: { touchedTasksArray: Task[] } = { touchedTasksArray: [] }) {
    let done = plugins.Q.defer();
    taskArg.running = true;
    done.promise.then(function () { taskArg.running = false });
    let localDeferred = plugins.Q.defer();
    let touchedTasksArray: Task[];
    if (optionsArg.touchedTasksArray) {
        touchedTasksArray = optionsArg.touchedTasksArray;
    } else {
        touchedTasksArray = [];
    }
    touchedTasksArray.push(taskArg);
    localDeferred.promise
        .then(() => {
            if (taskArg.preTask && !isTaskTouched(taskArg.preTask, touchedTasksArray)) {
                return runTask(taskArg.preTask, { touchedTasksArray: touchedTasksArray })
            } else {
                let done2 = plugins.Q.defer();
                done2.resolve();
                return done2.promise;
            }
        })
        .then(() => {
            return taskArg.task();
        })
        .then(() => {
            if (taskArg.afterTask && !isTaskTouched(taskArg.afterTask, touchedTasksArray)) {
                return runTask(taskArg.afterTask, { touchedTasksArray: touchedTasksArray })
            } else {
                let done2 = plugins.Q.defer();
                done2.resolve();
                return done2.promise;
            }
        })
        .then(() => {
            done.resolve();
        });
    localDeferred.resolve();
    return done.promise;
};


export interface cycleObject {
    cycleCounter:number,
    deferred:plugins.Q.Deferred<any>
}

export class CycleCounter {
    task:Task;
    cycleObjectArray:cycleObject[] = [];
    constructor(taskArg:Task){
        this.task = taskArg;
    };
    getPromiseForCycle(cycleCountArg:number){
        let done = plugins.Q.defer();
        let cycleObject:cycleObject = {
            cycleCounter:cycleCountArg,
            deferred:done
        };
        this.cycleObjectArray.push(cycleObject);
        return done.promise;
    };
    informOfCycle(){
        let newCycleObjectArray:cycleObject[] = [];
        this.cycleObjectArray.forEach(cycleObjectArg => {
            cycleObjectArg.cycleCounter--;
            if(cycleObjectArg.cycleCounter <= 0){
                cycleObjectArg.deferred.resolve();
            } else {
                newCycleObjectArray.push(cycleObjectArg);
            };
        });
        this.cycleObjectArray = newCycleObjectArray;
    }
}

export class BufferRunner {
    task:Task;
    // initialze by default
    bufferCounter:number = 0;
    bufferMax:number = 1;
    running:boolean = false;
    constructor(taskArg: Task) {
        this.task = taskArg;
    };
    private _run() {
        let recursiveBufferRunner = () => {
            if (this.bufferCounter >= 0) {
                this.running = true;
                this.task.running = true;
                runTask(this.task)
                    .then(() => {
                        this.bufferCounter--;
                        this.task.cycleCounter.informOfCycle();
                        recursiveBufferRunner();
                    });
            } else {
                this.running = false;
                this.task.running = false;
            }
        };
        recursiveBufferRunner();
    };
    setBufferMax(bufferMaxArg:number){
        this.bufferMax = bufferMaxArg;
    };
    trigger(): PromiseLike<any> {
        if(!(this.bufferCounter >= this.bufferMax)){
            this.bufferCounter++
        };
        let returnPromise:PromiseLike<any> = this.task.cycleCounter.getPromiseForCycle(this.bufferCounter + 1);
        if(!this.running){
            this._run();
        }
        return returnPromise;
    };
};