var quill;

//save notes to global chrome storage
function saveNotes(notes) {
	chrome.storage.sync.set({notes: notes.trim()}, () => {});
}

//load quill editor (and insert notes if necessary)
function loadQuill(notes) {
	quill = new Quill("#editor", {
		theme: "snow",
		placeholder: "Jot down some notes...",
		modules: {
			toolbar: false,
		},
	});

	if (notes) quill.insertText(0, notes.trim());

	quill.on("text-change", () => {
		saveNotes(quill.getText());
	});
}

//load stored notes (if they exist) then load quill editor with them
function main() {
	chrome.storage.sync.get(["notes"], function (items) {
		loadQuill(items.notes);
	});
	document.addEventListener("keydown", () => {console.log('hi')});
}

main();