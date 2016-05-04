
import helpers = require("./taskbuffer.classes.helpers");
import * as classes from "./taskbuffer.classes"


export class Taskchain extends classes.Task {
    constructor(taskArrayArg:classes.Task[]){
        super({
            task: function(){}
        });
    }
}