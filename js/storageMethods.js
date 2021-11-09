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
		let url;
		if (tabs.length > 0) tabs[0].hasOwnProperty("url") ? tabs[0].url : null;
		else url = null;

		//using current seconds as key for note
		previousNotes[(Date.now() / 1000) | 0] = {note: note, url: url};

		//make sure keys don't overflow
		// const keys = Object.keys(previousNotes);
		// if (keys.length > maxStoredNotes){
		// 	for (let i = 0; i < keys.length - maxStoredNotes; i++){
		// 		delete previousNotes[keys[i]];
		// 	}
		// }

		chrome.storage.sync.set({previousNotes}, () => {});
		window.close();
	});
}
