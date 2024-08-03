import "reset-css";
import "./style/template.scss";
import "./style/project.scss";
import "./style/todo.scss";

import TodoItem from "./TodoItem";
import TodoProject from "./TodoProject";
import DomHandler from "./DomHandler";

const projects = [];

function addProject(project) {
	projects.push(project);
	DomHandler.renderContent(projects);
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

test();
