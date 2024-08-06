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

function addPremadeProject(project) {
	projects.push(project);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function addItemToProject(project, item) {
	const projectIndex = getProjectIndex(project);
	if (projectIndex === -1) return;

	projects[projectIndex].addItem(item);
	PubSub.emit(PubSub.EVENTS.UPDATE, projects);
}

function addTodoItem({ project, title, desc }) {
	// ! Using new Date is temporary!
	const todoItem = new TodoItem(
		title,
		desc,
		new Date(),
		TodoItem.PRIORITIES.NORMAL
	);

	addItemToProject(project, todoItem);
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
	addPremadeProject(myProject);
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
	addPremadeProject(myProject);
	addItemToProject(myProject, myItem);
}

PubSub.subscribe(PubSub.EVENTS.ADD_ITEM, addTodoItem);
PubSub.subscribe(PubSub.EVENTS.DELETE_ITEM, deleteTodoItem);
PubSub.subscribe(PubSub.EVENTS.UPDATE_PROJECT_TITLE, updateProjectTitle);
PubSub.subscribe(PubSub.EVENTS.DELETE_PROJECT, deleteProject);
PubSub.subscribe(PubSub.EVENTS.ADD_PROJECT, addProject);

start();
