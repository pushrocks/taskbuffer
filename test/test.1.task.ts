import { expect, tap } from 'tapbundle'
import taskbuffer = require('../dist/index')

import * as q from 'smartq'
import * as smartdelay from 'smartdelay'

// setup some testData to work with
let testTask: taskbuffer.Task

let testPreTask = new taskbuffer.Task({
  taskFunction: function () {
    let done = q.defer()
    console.log('preTask executed')
    done.resolve()
    return done.promise
  },
  preTask: testTask
})

// some more tasks to test with
let task1Counter = 0 // how often task 1 is being executed
let task1 = new taskbuffer.Task({
  name: 'Task 1',
  taskFunction: () => {
    let done = q.defer()
    console.log('Task1 started')
    setTimeout(() => {
      task1Counter++
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
  testTask = new taskbuffer.Task({ taskFunction: async () => { console.log('executed twice') }, preTask: testPreTask })
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
  let localTestTask = new taskbuffer.Task({ taskFunction: async () => { console.log('only once') } })
  await localTestTask.trigger()
})

tap.test('expect run buffered', async () => {
  let localTestTask = new taskbuffer.Task({
    taskFunction: async () => { await smartdelay.delayFor(3000) },
    buffered: true,
    bufferMax: 2
  })
  localTestTask.trigger()
  localTestTask.trigger()
  localTestTask.trigger()
  await localTestTask.trigger()
})

tap.start()
