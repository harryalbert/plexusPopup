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

function loadStoredNotes(notes) {
	let div = document.getElementById("storedNotes");
	for (let key in notes) {
		console.log(key);
		let note = notes[key];

		//create div for new quill element
		let newEditor = document.createElement("div");
		newEditor.id = key;
		div.appendChild(newEditor);

		//create new quill editor within div
		let storedNote = new Quill(document.getElementById(key), {
			theme: "snow",
			modules: {
				toolbar: false,
			},
			readOnly: true
		});

		storedNote.insertText(0, note.note);
	}
}
