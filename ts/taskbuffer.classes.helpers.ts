import plugins = require('./taskbuffer.plugins')
import { Task, ITaskFunction } from './taskbuffer.classes.task'

export let emptyTaskFunction: ITaskFunction = function (x) {
  let done = plugins.q.defer()
  done.resolve()
  return done.promise
}

export let isTask = function (taskArg: Task): boolean {
  if (
    taskArg instanceof Task
    && typeof taskArg.taskFunction === 'function'
  ) {
    return true
  } else {
    return false
  }
}

export let isTaskTouched = (taskArg: Task, touchedTasksArray: Task[]): boolean => {
  let result = false
  for (let keyArg in touchedTasksArray) {
    if (taskArg === touchedTasksArray[ keyArg ]) {
      result = true
    }
  }
  return result
}

export let runTask = function (taskArg: Task, optionsArg: { x?, touchedTasksArray?: Task[] }) {
  let done = plugins.q.defer()

  //  set running params
  taskArg.running = true
  done.promise.then(function () { taskArg.running = false })

  // handle options
  let options = plugins.lodash.merge(
    { x: undefined, touchedTasksArray: [] },
    optionsArg
  )
  let x = options.x
  let touchedTasksArray: Task[] = options.touchedTasksArray

  touchedTasksArray.push(taskArg)

  // run the task cascade
  let localDeferred = plugins.q.defer()
  localDeferred.promise
    .then(() => {
      if (taskArg.preTask && !isTaskTouched(taskArg.preTask, touchedTasksArray)) {
        return runTask(taskArg.preTask, { x: x, touchedTasksArray: touchedTasksArray })
      } else {
        let done2 = plugins.q.defer()
        done2.resolve(x)
        return done2.promise
      }
    })
    .then(x => {
      return taskArg.taskFunction(x)
    })
    .then(x => {
      if (taskArg.afterTask && !isTaskTouched(taskArg.afterTask, touchedTasksArray)) {
        return runTask(taskArg.afterTask, { x: x, touchedTasksArray: touchedTasksArray })
      } else {
        let done2 = plugins.q.defer()
        done2.resolve(x)
        return done2.promise
      }
    })
    .then(x => {
      done.resolve(x)
    }).catch((err) => {
      console.log(err)
    })
  localDeferred.resolve()
  return done.promise
}

export interface cycleObject {
  cycleCounter: number,
  deferred: plugins.q.Deferred<any>
}

export class CycleCounter {
  task: Task
  cycleObjectArray: cycleObject[] = []
  constructor(taskArg: Task) {
    this.task = taskArg
  }
  getPromiseForCycle (cycleCountArg: number) {
    let done = plugins.q.defer()
    let cycleObject: cycleObject = {
      cycleCounter: cycleCountArg,
      deferred: done
    }
    this.cycleObjectArray.push(cycleObject)
    return done.promise
  }
  informOfCycle (x) {
    let newCycleObjectArray: cycleObject[] = []
    this.cycleObjectArray.forEach(cycleObjectArg => {
      cycleObjectArg.cycleCounter--
      if (cycleObjectArg.cycleCounter <= 0) {
        cycleObjectArg.deferred.resolve(x)
      } else {
        newCycleObjectArray.push(cycleObjectArg)
      }
    })
    this.cycleObjectArray = newCycleObjectArray
  }
}

export class BufferRunner {
  task: Task
  // initialze by default
  bufferCounter: number = 0
  bufferMax: number = 1
  running: boolean = false
  constructor(taskArg: Task) {
    this.task = taskArg
  }

  setBufferMax (bufferMaxArg: number) {
    this.bufferMax = bufferMaxArg
  }

  trigger (x): Promise<any> {
    if (!(this.bufferCounter >= this.bufferMax)) {
      this.bufferCounter++
    }
    let returnPromise: Promise<any> = this.task.cycleCounter.getPromiseForCycle(this.bufferCounter + 1)
    if (!this.running) {
      this._run(x)
    }
    return returnPromise
  }

  private _run (x) {
    let recursiveBufferRunner = (x) => {
      if (this.bufferCounter >= 0) {
        this.running = true
        this.task.running = true
        runTask(this.task, { x: x })
          .then((x) => {
            this.bufferCounter--
            this.task.cycleCounter.informOfCycle(x)
            recursiveBufferRunner(x)
          })
      } else {
        this.running = false
        this.task.running = false
      }
    }
    recursiveBufferRunner(x)
  }

}
