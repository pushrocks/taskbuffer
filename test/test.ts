import { expect, tap } from 'tapbundle'
import taskbuffer = require('../dist/index')

import * as q from 'smartq'

// setup some testData to work with
let testTask: taskbuffer.Task
let testTaskFunction = function () {
  let done = q.defer()
  console.log('main function executed!')
  done.resolve()
  return done.promise
}

let testTaskFunctionTimeout = function () {
  let done = q.defer()
  console.log('main function started!')
  setTimeout(() => {
    console.log('main function ended!')
    done.resolve()
  }, 2000)
  return done.promise
}

let testPreTask = new taskbuffer.Task({
  taskFunction: function () {
    let done = q.defer()
    console.log('preTask executed')
    done.resolve()
    return done.promise
  },
  preTask: testTask
})

// some more tasks to wirj with
let task1 = new taskbuffer.Task({
  name: 'Task 1',
  taskFunction: () => {
    let done = q.defer()
    console.log('Task1 started')
    setTimeout(() => {
      console.log('Task1 executed')
      done.resolve()
    }, 5000)
    return done.promise
  }
})
let task2 = new taskbuffer.Task({
  name: 'Task 1',
  taskFunction: () => {
    let done = q.defer()
    console.log('Task2 started')
    setTimeout(() => {
      console.log('Task2 executed')
      done.resolve()
    }, 5000)
    return done.promise
  }
})
let task3 = new taskbuffer.Task({
  name: 'Task 3',
  taskFunction: () => {
    let done = q.defer()
    console.log('Task3 started')
    setTimeout(() => {
      console.log('Task3 executed')
      done.resolve()
    }, 5000)
    return done.promise
  }
})

tap.test('new Task() should return a new task', async () => {
  testTask = new taskbuffer.Task({ taskFunction: testTaskFunction, preTask: testPreTask })
})
tap.test('testTask should be and instance of Task', async () => {
  expect(testTask).to.be.instanceof(taskbuffer.Task)
})
tap.test('testTask.idle is true', async () => {
  if (!testTask.idle) {
    throw new Error('testTask.idle is not true')
  }

})
tap.test('testTask.running is type boolean and initially false', async () => {
  expect(testTask.running).to.be.a('boolean')
  // tslint:disable-next-line:no-unused-expression
  expect(testTask.running).to.be.false
})

tap.test('testTask.trigger() expect return Promise', async () => {
  expect(testTask.trigger()).to.be.instanceof(Promise)
})

tap.test('testTask.trigger() returned Promise expect be fullfilled', async () => {
  await testTask.trigger()
})

tap.test('expect run a task without pre and afterTask', async () => {
  let localTestTask = new taskbuffer.Task({ taskFunction: testTaskFunction })
  await localTestTask.trigger()
})

tap.test('expect run buffered', async () => {
  let localTestTask = new taskbuffer.Task({
    taskFunction: testTaskFunctionTimeout,
    buffered: true,
    bufferMax: 2
  })
  localTestTask.trigger()
  localTestTask.trigger()
  localTestTask.trigger()
  await localTestTask.trigger()
})

let testTaskchain
let testTaskArray = [
  new taskbuffer.Task({
    name: 'task1',
    taskFunction: function () {
      let done = q.defer()
      setTimeout(done.resolve, 2000)
      return done.promise
    }
  }),
  new taskbuffer.Task({
    name: 'task2',
    taskFunction: function () {
      let done = q.defer()
      setTimeout(done.resolve, 2000)
      return done.promise
    }
  })
]

tap.test('expect run tasks in sequence', async () => {
  testTaskchain = new taskbuffer.Taskchain({
    name: 'Taskchain1',
    taskArray: testTaskArray
  })
  await testTaskchain.trigger()
})

tap.test('expect run in Parallel', async () => {
  let testTaskparallel = new taskbuffer.Taskparallel({
    taskArray: [ task1, task2, task3 ]
  })
  await testTaskparallel.trigger()
})

let flowTask1 = new taskbuffer.Task({
  taskFunction: (x: number) => {
    let done = q.defer()
    console.log('flowTask1')
    console.log(x)
    done.resolve(x)
    return done.promise
  }
})

let flowTaskBuffered = new taskbuffer.Task({
  taskFunction: (x: number) => {
    let done = q.defer()
    console.log('flowTask1')
    console.log(x)
    done.resolve(x)
    return done.promise
  },
  buffered: true,
  bufferMax: 1
})

let flowTask2 = new taskbuffer.Task({
  taskFunction: (x: number) => {
    let done = q.defer()
    console.log('flowTask2')
    console.log(x)
    done.resolve(x)
    return done.promise
  },
  preTask: flowTask1
})

let flowTask3 = new taskbuffer.Taskchain({
  taskArray: [ flowTask1, flowTask2 ]
})

tap.test('should let a value flow through a task', async () => {
  let result = await flowTask1.trigger(12)
  expect(result).to.equal(12)
})

tap.test('should let a values flow between tasks', async () => {
  let result = await flowTask2.trigger(12)
  expect(result).to.equal(12)
})

tap.test('expect let a values flow between tasks when buffered', async () => {
  let result = await flowTaskBuffered.trigger(12)
  expect(result).to.equal(12)
})

tap.test('should let a values flow between tasks in Taskchain', async () => {
  let result = await flowTask3.trigger(12)
  expect(result).to.equal(12)
})

tap.start()
