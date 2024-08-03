const content = document.querySelector("main");

function createProjectElement(project) {
	console.log(`rendering project (${project.title})`);
}

function createTodoItemElement(item) {
	console.log("rendering todo item");
	console.log({ ...item });
}

function clearContent() {
	content.innerHTML = "";
}

function renderContent(projects) {
	clearContent();

	projects.forEach((project) => {
		createProjectElement(project);

		project.items.forEach((item) => {
			createTodoItemElement(item);
		});
	});
}

export default { renderContent };
