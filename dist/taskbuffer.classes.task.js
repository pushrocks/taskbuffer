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
        if (stateArg === 'locked') {
            this._state = 'locked';
        }
        else {
            plugins.beautylog.error('state type ' + stateArg + ' could not be set');
        }
    }
}
exports.Task = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMudGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0RBQStDO0FBQy9DLHdEQUF1RDtBQU12RDtJQWNFLFlBQVksVUFPWDtRQWRELHdCQUF3QjtRQUN4QixZQUFPLEdBQVksS0FBSyxDQUFBO1FBQ3hCLGlCQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdDLFNBQUksR0FBWSxJQUFJLENBQUE7UUFDWixXQUFNLEdBQVcsT0FBTyxDQUFBO1FBVTlCLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFBO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsQ0FBRTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEMsQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsQ0FBRTtRQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlLENBQUMsQ0FBRTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3BCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFnQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxHQUFHLG1CQUFtQixDQUFDLENBQUE7UUFDekUsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXBFRCxvQkFvRUMifQ==