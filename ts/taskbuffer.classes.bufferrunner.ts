import { Task } from './taskbuffer.classes.task';

export class BufferRunner {
  public task: Task;
  // initialze by default
  public bufferCounter: number = 0;
  public running: boolean = false;
  constructor(taskArg: Task) {
    this.task = taskArg;
  }

  public trigger(x): Promise<any> {
    if (!(this.bufferCounter >= this.task.bufferMax)) {
      this.bufferCounter++;
    }
    const returnPromise: Promise<any> = this.task.cycleCounter.getPromiseForCycle(
      this.bufferCounter + 1
    );
    if (!this.running) {
      this._run(x);
    }
    return returnPromise;
  }

  private _run(x) {
    const recursiveBufferRunner = x => {
      if (this.bufferCounter >= 0) {
        this.running = true;
        this.task.running = true;
        Task.runTask(this.task, { x: x }).then(x => {
          this.bufferCounter--;
          this.task.cycleCounter.informOfCycle(x);
          recursiveBufferRunner(x);
        });
      } else {
        this.running = false;
        this.task.running = false;
      }
    };
    recursiveBufferRunner(x);
  }
}
