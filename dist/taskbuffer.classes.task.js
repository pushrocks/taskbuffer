"use strict";
const plugins = require("./taskbuffer.plugins");
const helpers = require("./taskbuffer.classes.helpers");
class Task {
    constructor(optionsArg) {
        if (!optionsArg) {
            optionsArg = { taskFunction: function () { } };
        }
        var options = optionsArg;
        this.task = optionsArg.taskFunction;
        this.preTask = options.preTask;
        this.afterTask = options.afterTask;
        this.running = false;
        this.idle = true;
        this.buffered = options.buffered;
        this.bufferMax = options.bufferMax;
        this.name = options.name;
    }
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
    triggerUnBuffered() {
        return helpers.runTask(this);
    }
    triggerBuffered() {
        var done = plugins.Q.defer();
        if (!(this.bufferCounter >= this.bufferMax)) {
            this.bufferCounter++;
        }
        helpers.runBufferedTask(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90YXNrYnVmZmVyLmNsYXNzZXMudGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0sc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsTUFBWSxPQUFPLFdBQU0sOEJBRXpCLENBQUMsQ0FGc0Q7QUFFdkQ7SUFhSSxZQUFZLFVBT1g7UUFDRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFBQSxVQUFVLEdBQUcsRUFBQyxZQUFZLEVBQUMsY0FBVyxDQUFDLEVBQUMsQ0FBQTtRQUFBLENBQUM7UUFDMUQsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxlQUFlLEVBQUU7aUJBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2lCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFBQSxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7SUFDRCxpQkFBaUI7UUFDYixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsZUFBZTtRQUNYLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDeEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLENBQUM7UUFDakYsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBbkVZLFlBQUksT0FtRWhCLENBQUEifQ==