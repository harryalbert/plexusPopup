//save notes to global chrome storage
async function saveCurrentNote(note) {
	chrome.storage.sync.set({currentNote: note.trim()}, () => {});
}

//save current note to stored notes
async function storeCurrentNote(note) {
	if (!note.trim()) return window.close();

	await saveCurrentNote(""); //clear quill editor
	chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
		//get current url (if it exists)
		console.log(tabs[0]);
		console.log(Object.keys(tabs).length)

		let url;
		if (Object.keys(tabs).length > 0) {
			url = tabs[0].title;
		} else url = null;

		//using current seconds as key for note
		previousNotes[(Date.now() / 1000) | 0] = {note: note, url: url};

		console.log(url);
		console.log(previousNotes);

		chrome.storage.sync.set({previousNotes}, () => {});
		// window.close();
	});
}
