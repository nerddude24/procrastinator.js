import { format, isValid } from "data-fns";

export default class TodoItem {
	static PRIORITIES = Object.freeze({
		HIGH: 2,
		NORMAL: 1,
		LOW: 0,
	});

	constructor(title, desc, dueDate, priority, notes = [], done = false) {
		this.title = title;
		this.desc = desc;
		this._dueDate = dueDate;
		this._priority = priority;
		this.notes = notes;
		this.done = done;
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
		return format(this._dueDate, "MMM do, yyyy");
	}
}
