"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./taskbuffer.plugins");
const helpers = require("./taskbuffer.classes.helpers");
class Task {
    constructor(optionsArg) {
        // initialize by default
        this.running = false;
        this.bufferRunner = new helpers.BufferRunner(this);
        this.cycleCounter = new helpers.CycleCounter(this);
        this.idle = true;
        this._state = 'ready';
        let options = optionsArg;
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
    }
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
        if (stateArg === 'locked') {
            this._state = 'locked';
        }
        else {
            plugins.beautylog.error('state type ' + stateArg + ' could not be set');
        }
    }
}
exports.Task = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMudGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUErQztBQUMvQyx3REFBdUQ7QUFNdkQ7SUFjRSxZQUFhLFVBT1o7UUFkRCx3QkFBd0I7UUFDeEIsWUFBTyxHQUFZLEtBQUssQ0FBQTtRQUN4QixpQkFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QyxpQkFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QyxTQUFJLEdBQVksSUFBSSxDQUFBO1FBQ1osV0FBTSxHQUFXLE9BQU8sQ0FBQTtRQVU5QixJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUE7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUE7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFFLENBQUU7UUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUIsQ0FBRSxDQUFFO1FBQ25CLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBRSxDQUFFO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFFLFFBQWdCO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxRQUFRLEdBQUcsbUJBQW1CLENBQUMsQ0FBQTtRQUN6RSxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBbkVELG9CQW1FQyJ9