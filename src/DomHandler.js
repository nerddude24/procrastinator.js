import TodoItem from "./TodoItem";

const content = document.querySelector("main");

function createElement(type, cls, txt = "") {
	const el = document.createElement(type);
	el.classList.add(cls);
	el.textContent = txt;

	return el;
}

function createProjectElement(project) {
	const { title } = project;
	const el = createElement("div", "project-card");
	const titleEl = createElement("h1", "project-card-title", title);
	const listEl = createElement("div", "project-card-list");

	el.appendChild(titleEl);
	el.appendChild(listEl);
	return el;
}

function createTodoItemElement(item) {
	const { title, desc, done } = item;
	const priority = item.getPriority();
	const priorityToClass = {
		[TodoItem.PRIORITIES.HIGH]: "todo-card-high-pr",
		[TodoItem.PRIORITIES.MED]: "todo-card-med-pr",
		[TodoItem.PRIORITIES.LOW]: "todo-card-low-pr",
	};

	const el = createElement("article", "todo-card");
	const titleEl = createElement("h3", "todo-card-title", title);
	const descEl = createElement("p", "todo-card-desc", desc);
	const checkbox = createElement("input", "todo-card-check");
	checkbox.type = "checkbox";
	checkbox.checked = done;

	if (done) {
		titleEl.classList.add("striked");
		descEl.classList.add("striked");
	}
	el.classList.add(priorityToClass[priority]);

	el.appendChild(titleEl);
	el.appendChild(descEl);
	el.appendChild(checkbox);

	return el;
}

function clearContent() {
	content.innerHTML = "";
}

function renderContent(projects) {
	clearContent();

	projects.forEach((project) => {
		const projectEl = createProjectElement(project);

		project.items.forEach((item) => {
			projectEl.appendChild(createTodoItemElement(item));
		});

		content.appendChild(projectEl);
	});
}

export default { renderContent };
