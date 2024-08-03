import TodoItem from "./TodoItem";

export default class TodoProject {
	constructor(title) {
		this.title = title;
		this.items = [];
	}

	addItem(item) {
		if (item instanceof TodoItem) this.items.unshift(item);
		else
			console.error(
				`Tried to add an invalid item ${item} to project (${this.title})`
			);
	}

	removeItem(item) {
		try {
			this.items.splice(this.items.indexOf(item), 1);
		} catch (error) {
			console.error(
				`Error while removing item ${item} from project (${this.title}): ${error} `
			);
		}
	}
}
