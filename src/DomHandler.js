import PubSub from "./PubSub";
import TodoItem from "./TodoItem";

const content = document.querySelector("main");
const todoPopup = document.querySelector("#todo-popup");
let currentPopupProject = null;

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

function popupNewTodo(project) {
	todoPopup.showModal();
	currentPopupProject = project;
}

function createProjectElement(project) {
	const { title } = project;
	const projectElement = createElement("div", "project-card");
	const titleEl = createElement("h1", "project-card-title", title);
	const addTodoBtn = createElement(
		"button",
		"project-card-add-btn",
		"Add a new todo"
	);
	const projectListElement = createElement("div", "project-card-list");
	const deleteBtn = createXDeleteButton("project-card-del");

	titleEl.setAttribute("contenteditable", "true");

	/* handle events */
	titleEl.addEventListener("input", (_) => {
		const newTitle = titleEl.textContent;
		PubSub.emit(PubSub.EVENTS.UPDATE_PROJECT_TITLE, { project, newTitle });
	});

	deleteBtn.addEventListener("click", () => {
		PubSub.emit(PubSub.EVENTS.DELETE_PROJECT, project);
	});

	addTodoBtn.addEventListener("click", () => {
		popupNewTodo(project);
	});
	/*---------------*/

	projectElement.appendChild(titleEl);
	projectElement.appendChild(addTodoBtn);
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

	// Add all projects' elements
	projects.forEach((project) => {
		const { projectElement, projectListElement } =
			createProjectElement(project);

		// Add all items' elements inside of this project
		project.items.forEach((item) => {
			projectListElement.appendChild(createTodoItemElement(project, item));
		});

		content.appendChild(projectElement);
	});

	// Add 'create new project' button
	const btnCreateProject = createElement(
		"button",
		"btn-add-project",
		"Create a new project"
	);
	btnCreateProject.addEventListener("click", () => {
		PubSub.emit(PubSub.EVENTS.ADD_PROJECT);
	});
	content.appendChild(btnCreateProject);
}

PubSub.subscribe(PubSub.EVENTS.UPDATE, renderContent);

todoPopup.querySelector("#todo-popup-cancel").addEventListener("click", () => {
	todoPopup.close();
});

todoPopup.querySelector("#todo-popup-add").addEventListener("click", () => {
	const title = todoPopup.querySelector("#todo-popup-title").value;
	const desc = todoPopup.querySelector("#todo-popup-desc").value;

	PubSub.emit(PubSub.EVENTS.ADD_ITEM, {
		project: currentPopupProject,
		title,
		desc,
	});

	currentPopupProject = null;
	todoPopup.close();
});
