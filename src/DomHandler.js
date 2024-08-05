import PubSub from "./PubSub";
import TodoItem from "./TodoItem";

const content = document.querySelector("main");

function createElement(type, cls, txt = "") {
	const el = document.createElement(type);
	el.classList.add(cls);
	el.textContent = txt;

	return el;
}

function createXDeleteButton(cls) {
	const btn = createElement("button", "x-btn", "x");
	btn.classList.add(cls);

	return btn;
}

function createProjectElement(project) {
	const { title } = project;
	const projectElement = createElement("div", "project-card");
	const titleEl = createElement("h1", "project-card-title", title);
	const projectListElement = createElement("div", "project-card-list");
	const deleteBtn = createXDeleteButton("project-card-del");

	/* handle events */
	deleteBtn.addEventListener("click", () => {
		PubSub.emit(PubSub.EVENTS.DELETE_PROJECT, project);
	});
	/*---------------*/

	projectElement.appendChild(titleEl);
	projectElement.appendChild(projectListElement);
	projectElement.appendChild(deleteBtn);

	return { projectElement, projectListElement };
}

function createTodoItemElement(project, item) {
	const { title, desc, isDone } = item;
	const priority = item.getPriority();
	const priorityToClass = {
		[TodoItem.PRIORITIES.HIGH]: "todo-card-high-pr",
		[TodoItem.PRIORITIES.NORMAL]: "todo-card-med-pr",
		[TodoItem.PRIORITIES.LOW]: "todo-card-low-pr",
	};

	const el = createElement("article", "todo-card");
	const titleEl = createElement("h3", "todo-card-title", title);
	const descEl = createElement("p", "todo-card-desc", desc);
	const checkbox = createElement("input", "todo-card-check");
	const deleteBtn = createXDeleteButton("todo-card-del");

	checkbox.type = "checkbox";
	checkbox.checked = isDone;

	/* handle events */
	checkbox.addEventListener("change", () => {
		item.toggleCheck();

		if (item.isDone) el.classList.add("todo-card-done");
		else el.classList.remove("todo-card-done");
	});

	deleteBtn.addEventListener("click", () => {
		PubSub.emit(PubSub.EVENTS.DELETE_ITEM, { project, item });
	});
	/*---------------*/
	if (isDone) {
		el.classList.add("todo-card-done");
	}
	el.classList.add(priorityToClass[priority]);

	el.appendChild(titleEl);
	el.appendChild(descEl);
	el.appendChild(checkbox);
	el.appendChild(deleteBtn);

	return el;
}

function clearContent() {
	content.innerHTML = "";
}

function renderContent(projects) {
	clearContent();

	projects.forEach((project) => {
		const { projectElement, projectListElement } =
			createProjectElement(project);

		project.items.forEach((item) => {
			projectListElement.appendChild(createTodoItemElement(project, item));
		});

		content.appendChild(projectElement);
	});
}

PubSub.subscribe(PubSub.EVENTS.UPDATE, renderContent);
