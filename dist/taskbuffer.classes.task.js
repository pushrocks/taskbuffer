"use strict";
const plugins = require("./taskbuffer.plugins");
const helpers = require("./taskbuffer.classes.helpers");
class Task {
    constructor(optionsArg) {
        // initialize by default
        this.running = false;
        this.bufferRunner = new helpers.BufferRunner(this);
        this.cycleCounter = new helpers.CycleCounter(this);
        this.idle = true;
        this._state = "ready";
        var options = optionsArg;
        this.taskFunction = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.idle = !this.running;
        this.buffered = options.buffered;
        this.bufferRunner.setBufferMax(options.bufferMax);
        this.name = options.name;
    }
    /**
     * trigger the task. Will trigger buffered if this.buffered is true
     */
    trigger(x) {
        if (this.buffered) {
            return this.triggerBuffered(x);
        }
        else {
            return this.triggerUnBuffered(x);
        }
        ;
    }
    ;
    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered(x) {
        return helpers.runTask(this, { x: x });
    }
    /**
     * trigger task buffered.
     */
    triggerBuffered(x) {
        return this.bufferRunner.trigger(x);
    }
    get state() {
        return this._state;
    }
    set state(stateArg) {
        if (stateArg == "locked") {
            this._state = "locked";
        }
        else {
            plugins.beautylog.error("state type " + stateArg.blue + " could not be set");
        }
    }
}
exports.Task = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMudGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsTUFBWSxPQUFPLFdBQU0sOEJBR3pCLENBQUMsQ0FIc0Q7QUFPdkQ7SUFjSSxZQUFZLFVBT1g7UUFkRCx3QkFBd0I7UUFDeEIsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ1osV0FBTSxHQUFVLE9BQU8sQ0FBQztRQVU1QixJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFDLENBQUU7UUFDTixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFBLENBQUM7SUFDTixDQUFDOztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsQ0FBRTtRQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlLENBQUMsQ0FBRTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLFFBQWU7UUFDckIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUNqRixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFwRVksWUFBSSxPQW9FaEIsQ0FBQSJ9