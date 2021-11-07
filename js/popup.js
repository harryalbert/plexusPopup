var quill;
var previousNotes = {};

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
		if (quill.getText().trim()) storeCurrentNote(quill.getText());
		else console.log('not good');
	};
}

//load stored notes (if they exist) then load quill editor with them
function main() {
	chrome.storage.sync.get(["currentNote", "previousNotes"], function (items) {
		previousNotes = items.previousNotes ? items.previousNotes : {}; //load previously saved notes
		console.log(previousNotes);

		loadQuill(items.currentNote);
		loadListeners();
	});
}

main();
