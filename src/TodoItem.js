import { format, isValid } from "date-fns";

export default class TodoItem {
	static PRIORITIES = Object.freeze({
		HIGH: "high",
		NORMAL: "normal",
		LOW: "low",
	});

	constructor(title, desc, dueDate, priority) {
		this.title = title;
		this.desc = desc;
		this._dueDate = dueDate;
		this._priority = priority;
		this.notes = [];
		this.done = false;
	}

	setPriority(newPriority) {
		if (newPriority in TodoItem.PRIORITIES) this.priority = newPriority;
		else
			console.error(
				`Tried to set invalid priority for todo item (${newPriority}).`
			);
	}

	getPriority() {
		return this._priority;
	}

	setDueDate(newDate) {
		if (isValid(newDate)) this.dueDate = newDate;
		else console.error(`Tried to set invalid date for todo item (${newDate}).`);
	}

	getDueDate() {
		return format(this._dueDate, "MMMM do, yyyy");
	}

	toggleCheck() {
		this.done = !this.done;
	}
}
