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
}

chrome.browserAction.onClicked.addListener(function() {
	console.log('hi');
    var w = 440;
    var h = 220;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2); 

    chrome.windows.create({'url': 'redirect.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} , function(window) {
    });
});

main();
