import "reset-css";
import "./style/template.scss";
import "./style/project.scss";
import "./style/todo.scss";

import "./DomHandler";
import "./LocalStorageHandler";
import TodoItem from "./TodoItem";
import TodoProject from "./TodoProject";
import PubSub from "./PubSub";
import { loadData } from "./LocalStorageHandler";

const projects = [];

function getProjectIndex(project) {
	const index = projects.indexOf(project);
	if (index === -1) {
		console.error(`Project (${project.title}) doesn't exist in list!`);
	}

	return index;
}

function addItemToProject({ project, title, desc, date }) {
	const todoItem = new TodoItem(title, desc, date, TodoItem.PRIORITIES.NORMAL);

	project.addItem(todoItem);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function deleteTodoItem({ project, item }) {
	project.removeItem(item);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function addProject() {
	const project = new TodoProject("New Project");
	projects.push(project);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function updateProjectTitle({ project, newTitle }) {
	project.title = newTitle;
}

function deleteProject(project) {
	const projectIndex = getProjectIndex(project);
	if (projectIndex === -1) return;

	projects.splice(projectIndex, 1);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function start() {
	const loadedData = loadData();

	if (loadedData) {
		console.log("Found data in local storage, loading...");

		loadedData.forEach((projectJson) => {
			const project = new TodoProject(projectJson["title"]);

			projectJson["items"].forEach((itemJson) => {
				const item = new TodoItem(
					itemJson["title"],
					itemJson["desc"],
					itemJson["_dueDate"],
					itemJson["_priority"]
				);

				project.addItem(item);
			});

			projects.push(project);
		});

		PubSub.emit(PubSub.EVENTS.UPDATE, projects);
		return;
	}

	console.log("No data found in local storage, generating default preset...");

	const myItem = new TodoItem(
		"My first todo!",
		"take out the trash.",
		new Date(2036, 7, 12),
		TodoItem.PRIORITIES.NORMAL
	);

	const myProject = new TodoProject("My Project");
	myProject.addItem(myItem);
	projects.push(myProject);

	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

PubSub.subscribe(PubSub.EVENTS.ADD_ITEM, addItemToProject);
PubSub.subscribe(PubSub.EVENTS.DELETE_ITEM, deleteTodoItem);
PubSub.subscribe(PubSub.EVENTS.UPDATE_PROJECT_TITLE, updateProjectTitle);
PubSub.subscribe(PubSub.EVENTS.DELETE_PROJECT, deleteProject);
PubSub.subscribe(PubSub.EVENTS.ADD_PROJECT, addProject);

start();
