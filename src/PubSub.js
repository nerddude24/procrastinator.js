export default (function () {
	let _events = {};
	const EVENTS = Object.freeze({
		UPDATE: "update",
		ADD_ITEM: "addItem",
		DELETE_ITEM: "delItem",
		UPDATE_PROJECT_TITLE: "updateProjectTitle",
		DELETE_PROJECT: "delProject",
	});

	function subscribe(eventName, fn) {
		_events[eventName] = _events[eventName] || [];
		_events[eventName].push(fn);
	}

	function unsubscribe(eventName, fn) {
		if (_events[eventName]) {
			for (var i = 0; i < _events[eventName].length; i++) {
				if (_events[eventName][i] === fn) {
					_events[eventName].splice(i, 1);
					break;
				}
			}
		}
	}

	function emit(eventName, data) {
		if (_events[eventName]) {
			_events[eventName].forEach((fn) => {
				fn(data);
			});
		}
	}

	return {
		subscribe,
		unsubscribe,
		emit,
		EVENTS,
	};
})();
