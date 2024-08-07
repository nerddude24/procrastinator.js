import PubSub from "./PubSub";

function saveData(projects) {
	const projectsSerialized = JSON.stringify(projects);
	localStorage.setItem("projects", projectsSerialized);
}

function loadData() {
	const projectsSerialized = localStorage.getItem("projects");
	if (projectsSerialized === null || projectsSerialized == []) return null;
	else return JSON.parse(projectsSerialized);
}

PubSub.subscribe(PubSub.EVENTS.UPDATE, saveData);

export { loadData };
