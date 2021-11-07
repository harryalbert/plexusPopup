var quill;
var previousNotes = {};

//save notes to global chrome storage
function saveCurrentNote(note) {
	chrome.storage.sync.set({currentNote: note.trim()}, () => {});
}

//save current note to stored notes
function storeCurrentNote(note) {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
		let url = tabs[0].hasOwnProperty('url') ? tabs[0].url : null;

		//using current seconds as key for note
		previousNotes[(Date.now() / 1000) | 0] = {note: note, url: url};
		chrome.storage.sync.set({previousNotes}, () => {});

		quill.setContents([{insert: "\n"}]);
		window.close();
	});
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
