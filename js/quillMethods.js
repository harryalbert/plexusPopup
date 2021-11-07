//load quill editor (and insert notes if necessary)
function loadQuill(note) {
	quill = new Quill("#editor", {
		theme: "snow",
		placeholder: "Jot down some notes...",
		modules: {
			toolbar: false,
		},
	});

	quill.container.style.height = "200px";
	quill.container.style.padding = "12px 0px";
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

		storedNote.container.style.margin = "0px 5px";
		storedNote.insertText(0, note.note);
	}
}
