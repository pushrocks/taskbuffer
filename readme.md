# @pushrocks/taskbuffer
flexible task management. TypeScript ready!

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/taskbuffer)
* [gitlab.com (source)](https://gitlab.com/pushrocks/taskbuffer)
* [github.com (source mirror)](https://github.com/pushrocks/taskbuffer)
* [docs (typedoc)](https://pushrocks.gitlab.io/taskbuffer/)

## Status for master
[![build status](https://gitlab.com/pushrocks/taskbuffer/badges/master/build.svg)](https://gitlab.com/pushrocks/taskbuffer/commits/master)
[![coverage report](https://gitlab.com/pushrocks/taskbuffer/badges/master/coverage.svg)](https://gitlab.com/pushrocks/taskbuffer/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/taskbuffer.svg)](https://www.npmjs.com/package/@pushrocks/taskbuffer)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/taskbuffer/badge.svg)](https://snyk.io/test/npm/@pushrocks/taskbuffer)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

We highly recommend TypeScript as this module supports **TypeScript intellisense**.

```javascript
import * as taskbuffer from "taskbuffer";

myTask = new taskbuffer.Task({
  preTask: someOtherTask // optional, don't worry loops are prevented
  afterTask: someOtherTask // optional, don't worry loops are prevented
  name:"myTask1",
  buffered: true, // optional
  bufferMax: 3, // optional, call qeues greater than this are truncated
  execDelay: 1000, // optional, time in ms to wait before executing task call
  taskFunction:() => {
    // do some stuff and return promise
    // pass on any data through promise resolution
    // Use TypeScript for better understanding and code completion
  }
})
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
