//save notes to global chrome storage
async function saveCurrentNote(note) {
	chrome.storage.sync.set({currentNote: note.trim()}, () => {});
}

//save current note to stored notes
async function storeCurrentNote(note) {
	await saveCurrentNote(""); //clear quill editor
	chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
		//get current url (if it exists)
		let url;
		if (tabs.length > 0) tabs[0].hasOwnProperty('url') ? tabs[0].url : null;
		else url = null;

		//using current seconds as key for note
		previousNotes[(Date.now() / 1000) | 0] = {note: note, url: url};
		chrome.storage.sync.set({previousNotes}, () => {});

		window.close();
	});
}