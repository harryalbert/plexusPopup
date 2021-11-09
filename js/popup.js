var quill;
var previousNotes = {};
// const maxStoredNotes = 10;

function loadListeners() {
	//save note on space or enter
	quill.root.addEventListener("keydown", (e) => {
		if (e.code == "Enter" || e.code == "Space")
			saveCurrentNote(quill.getText());
	});

	//save note every five seconds
	window.setInterval(() => {
		saveCurrentNote(quill.getText());
	}, 5000);

	document.getElementById("submitButton").onclick = () => {
		storeCurrentNote(quill.getText());
	};

	document.onkeydown = (e) => {
		if (e.code == "Enter" && e.ctrlKey) storeCurrentNote(quill.getText());
	};
}

//load stored notes (if they exist) then load quill editor with them
function main() {
	chrome.storage.sync.get(["currentNote", "previousNotes"], function (items) {
		previousNotes = items.previousNotes ? items.previousNotes : {}; //load previously saved notes
		loadStoredNotes(previousNotes);

		loadQuill(items.currentNote);
		loadListeners();
	});
}

main();
