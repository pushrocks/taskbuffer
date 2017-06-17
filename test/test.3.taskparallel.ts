import { expect, tap } from 'tapbundle'
import taskbuffer = require('../dist/index')

import * as smartq from 'smartq'
import * as smartdelay from 'smartdelay'

let task1Executed = false
let task1 = new taskbuffer.Task({
  taskFunction: async () => {
    await smartdelay.delayFor(2000)
    task1Executed = true
  }
})

let task2Executed = false
let task2 = new taskbuffer.Task({
  taskFunction: async () => {
    await smartdelay.delayFor(2000)
    task2Executed = true
  }
})

let task3Executed = false
let task3 = new taskbuffer.Task({
  taskFunction: async () => {
    await smartdelay.delayFor(2000)
    task3Executed = true
  }
})

tap.test('expect run in Parallel', async () => {
  let testTaskparallel = new taskbuffer.Taskparallel({
    taskArray: [ task1, task2, task3 ]
  })
  await testTaskparallel.trigger()
})

tap.start()
