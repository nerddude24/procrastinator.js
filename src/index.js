import "reset-css";
import "./style/template.scss";
import "./style/project.scss";
import "./style/todo.scss";

import TodoItem from "./TodoItem";
import TodoProject from "./TodoProject";
import DomHandler from "./DomHandler";

const projects = [];

function saveData() {}
function loadData() {}

function addProject(project) {
	projects.push(project);
	DomHandler.renderContent(projects);
	saveData();
}

function addItemToProject(project, item) {
	const index = projects.indexOf(project);
	if (index === -1) {
		console.error(
			`Tried to add an item to a project (${project.name}) that doesn't exist!`
		);
		return;
	}

	projects[index].addItem(item);
	DomHandler.renderContent(projects);
	saveData();
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
	loadData();

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

start();
