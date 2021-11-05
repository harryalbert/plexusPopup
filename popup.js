var quill;
var previousNotes = {};

//save notes to global chrome storage
function saveCurrentNote(note) {
	chrome.storage.sync.set({currentNote: note.trim()}, () => {});
}

//save current note to stored notes
function storeCurrentNote(note) {
	//using current seconds as key for note
	previousNotes[(Date.now() / 1000) | 0] = note;
	chrome.storage.sync.set({previousNotes}, () => {});

	quill.setContents([{insert: "\n"}]);
}

//load quill editor (and insert notes if necessary)
function loadQuill(note) {
	quill = new Quill("#editor", {
		theme: "snow",
		placeholder: "Jot down some notes...",
		modules: {
			toolbar: false,
		},
	});

	if (note) quill.insertText(0, note.trim());
}

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
}

//load stored notes (if they exist) then load quill editor with them
function main() {
	chrome.storage.sync.get(["currentNote", "previousNotes"], function (items) {
		previousNotes = items.previousNotes ? items.previousNotes : {}; //load previously saved notes

		loadQuill(items.currentNote);
		loadListeners();
	});
}

main();
