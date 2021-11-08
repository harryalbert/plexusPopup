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

	const keys = Object.keys(notes);
	for (let i = keys.length - 1; i >= 0; i--) {
		let key = keys[i];
		console.log(key);
		let note = notes[key];

		let title = document.createElement("h1");
		title.classList = "title storedNoteTitle";
		title.innerHTML = toDateTime(key).toDateString();
		div.appendChild(title);

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
			readOnly: true,
		});

		storedNote.container.style.margin = "5px";
		storedNote.insertText(0, note.note.trim());
	}
}

//convet seconds key to date
function toDateTime(secs) {
	var t = new Date(1970, 0, 1); // Epoch
	t.setSeconds(secs);
	return t;
}
