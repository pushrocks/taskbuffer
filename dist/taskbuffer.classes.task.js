"use strict";
const plugins = require("./taskbuffer.plugins");
const helpers = require("./taskbuffer.classes.helpers");
class Task {
    constructor(optionsArg) {
        this.running = false;
        this.runningBuffered = false;
        this.idle = true;
        this.buffered = false;
        this.bufferMax = 1;
        this._counterTriggerAbsolute = 0;
        var options = optionsArg;
        this.task = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.running = false;
        this.idle = !this.running && !this.runningBuffered;
        this.buffered = options.buffered;
        this.bufferMax = options.bufferMax;
        this.name = options.name;
    }
    /**
     * trigger the task. Will trigger buffered if this.buffered is true
     */
    trigger() {
        let done = plugins.Q.defer();
        if (this.buffered) {
            this.triggerBuffered()
                .then(done.resolve);
        }
        else {
            this.triggerUnBuffered()
                .then(done.resolve);
        }
        ;
        return done.promise;
    }
    ;
    /**
     * trigger task unbuffered.
     */
    triggerUnBuffered() {
        return helpers.runTask(this);
    }
    /**
     * trigger task buffered.
     */
    triggerBuffered() {
        var done = plugins.Q.defer();
        if (!(this.bufferCounter >= this.bufferMax)) {
            this.bufferCounter++;
        }
        ;
        if (!this.runningBuffered) {
            helpers.runBufferedTask(this);
        }
        ;
        return done.promise;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMudGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsTUFBWSxPQUFPLFdBQU0sOEJBR3pCLENBQUMsQ0FIc0Q7QUFPdkQ7SUFjSSxZQUFZLFVBT1g7UUFsQkQsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUN4QixvQkFBZSxHQUFXLEtBQUssQ0FBQztRQUNoQyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLGFBQVEsR0FBVyxLQUFLLENBQUM7UUFFekIsY0FBUyxHQUFVLENBQUMsQ0FBQztRQUNiLDRCQUF1QixHQUFVLENBQUMsQ0FBQztRQWF2QyxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU87UUFDSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRTtpQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsaUJBQWlCLEVBQUU7aUJBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUFBLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNYLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDeEIsQ0FBQztRQUFBLENBQUM7UUFDRixFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUFBLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLFFBQWU7UUFDckIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUNqRixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFoRlksWUFBSSxPQWdGaEIsQ0FBQSJ9