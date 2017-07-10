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
        this.taskFunction = optionsArg.taskFunction;
        this.preTask = optionsArg.preTask;
        this.afterTask = optionsArg.afterTask;
        this.idle = !this.running;
        this.buffered = optionsArg.buffered;
        this.bufferMax = optionsArg.bufferMax;
        this.execDelay = optionsArg.execDelay;
        this.name = optionsArg.name;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMudGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUErQztBQUMvQyx3REFBdUQ7QUFNdkQ7SUFxQkUsWUFBWSxVQThCWDtRQXRDRCx3QkFBd0I7UUFDeEIsWUFBTyxHQUFZLEtBQUssQ0FBQTtRQUN4QixpQkFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QyxpQkFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUU3QyxTQUFJLEdBQVksSUFBSSxDQUFBO1FBQ1osV0FBTSxHQUFXLE9BQU8sQ0FBQTtRQWlDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUE7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUE7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxDQUFFO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsQ0FBRTtRQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlLENBQUMsQ0FBRTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFnQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLG1CQUFtQixDQUFDLENBQUE7UUFDekUsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWxHRCxvQkFrR0MifQ==