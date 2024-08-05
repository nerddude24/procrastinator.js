import "reset-css";
import "./style/template.scss";
import "./style/project.scss";
import "./style/todo.scss";

import "./DomHandler";
import "./LocalStorageHandler";
import TodoItem from "./TodoItem";
import TodoProject from "./TodoProject";
import PubSub from "./PubSub";

const projects = [];

function getProjectIndex(project) {
	const index = projects.indexOf(project);
	if (index === -1) {
		console.error(`Project (${project.name}) doesn't exist in list!`);
	}

	return index;
}

function addProject(project) {
	projects.push(project);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function addItemToProject(project, item) {
	const projectIndex = getProjectIndex(project);
	if (projectIndex === -1) return;

	projects[projectIndex].addItem(item);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function deleteTodoItem({ project, item }) {
	project.removeItem(item);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function deleteProject(project) {
	const projectIndex = getProjectIndex(project);
	if (projectIndex === -1) return;

	projects.splice(projectIndex, 1);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function test() {
	const myItem1 = new TodoItem(
		"hi",
		"hello",
		Date.now(),
		TodoItem.PRIORITIES.HIGH
	);
	myItem1.toggleCheck();

	const myItem2 = new TodoItem(
		"yo",
		"im an item",
		Date.now(),
		TodoItem.PRIORITIES.LOW
	);

	const myProject = new TodoProject("PROJECT");
	addProject(myProject);
	addItemToProject(myProject, myItem1);
	addItemToProject(myProject, myItem2);
}

function start() {
	// TODO: Check if there is data in localStorage then load it

	const myItem = new TodoItem(
		"Your first todo!",
		"take out the trash.",
		new Date(2036, 7, 12),
		TodoItem.PRIORITIES.NORMAL
	);

	const myProject = new TodoProject("My Project");
	addProject(myProject);
	addItemToProject(myProject, myItem);
}

PubSub.subscribe(PubSub.EVENTS.DELETE_ITEM, deleteTodoItem);

start();
