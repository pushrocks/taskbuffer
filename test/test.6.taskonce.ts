import { expect, tap } from 'tapbundle'

import * as taskbuffer from '../dist/index'

let myNumber = 0
let myTaskOnce: taskbuffer.TaskOnce

tap.test('should create a valid instance of TaskOnce', async () => {
  myTaskOnce = new taskbuffer.TaskOnce({
    taskFunction: async () => {
      myNumber++
    }
  })
  expect(myTaskOnce).to.be.instanceof(taskbuffer.TaskOnce)
})

tap.test('myNumber should still be 0', async () => {
  expect(myNumber).to.equal(0)
})

tap.test('myTaskOnce should trigger once', async () => {
  await myTaskOnce.trigger()
  await myTaskOnce.trigger()
  await myTaskOnce.trigger()
  expect(myNumber).to.equal(1)
})

tap.start()
