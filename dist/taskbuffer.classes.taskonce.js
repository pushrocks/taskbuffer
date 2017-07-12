"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskbuffer_classes_task_1 = require("./taskbuffer.classes.task");
/**
 * TaskOnce is run exactly once, no matter how often it is triggered
 */
class TaskOnce extends taskbuffer_classes_task_1.Task {
    constructor(optionsArg) {
        super({
            name: optionsArg.name,
            taskFunction: () => __awaiter(this, void 0, void 0, function* () {
                if (!this.hasTriggered) {
                    this.hasTriggered = true;
                    yield optionsArg.taskFunction();
                }
            })
        });
        this.hasTriggered = false;
    }
}
exports.TaskOnce = TaskOnce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2J1ZmZlci5jbGFzc2VzLnRhc2tvbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdGFza2J1ZmZlci5jbGFzc2VzLnRhc2tvbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx1RUFBK0Q7QUFFL0Q7O0dBRUc7QUFDSCxjQUFzQixTQUFRLDhCQUFJO0lBRWhDLFlBQWEsVUFHWjtRQUNDLEtBQUssQ0FBQztZQUNKLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtZQUNyQixZQUFZLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7b0JBQ3hCLE1BQU0sVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFBO2dCQUNqQyxDQUFDO1lBQ0gsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFBO1FBYkosaUJBQVksR0FBWSxLQUFLLENBQUE7SUFjN0IsQ0FBQztDQUNGO0FBaEJELDRCQWdCQyJ9