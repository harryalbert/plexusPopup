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