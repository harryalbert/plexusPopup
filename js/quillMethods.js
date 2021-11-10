//load quill editor (and insert notes if necessary)
function loadQuill(note) {
	quill = new Quill("#editor", {
		theme: "snow",
		placeholder: "write something...",
		modules: {
			toolbar: false,
		},
	});

	if (note) quill.insertText(0, note.trim());
}

function displayStoredNotes(notes) {
	let div = document.getElementById("storedNotesContainer");
	let currentDate = new Date();

	const keys = Object.keys(notes);
	for (let i = keys.length - 1; i >= 0; i--) {
		let key = keys[i];
		let note = notes[key];

		//display date as title
		let title = document.createElement("h1");
		title.classList = "title storedNoteTitle";

		//set title text
		let inner = formatDate(key, currentDate);
		if (note.url) inner += " - " + note.url;
		title.innerHTML = inner;
		div.appendChild(title);

		//create div for new quill element
		let newEditor = document.createElement("div");
		newEditor.id = key;
		newEditor.className = "storedNote";
		div.appendChild(newEditor);

		//add horizontal line under note to differentiate notes
		// if (i > 0) {
		// 	let horizontalLine = document.createElement("hr");
		// 	horizontalLine.className = "horizontalLine";
		// 	div.appendChild(horizontalLine);
		// }

		//create new (read only) quill editor within div
		let storedNote = new Quill(document.getElementById(key), {
			theme: "snow",
			modules: {
				toolbar: false,
			},
			readOnly: true,
		});

		storedNote.container.classList.add("storedNoteContainer");
		storedNote.insertText(0, note.note.trim());
	}
}