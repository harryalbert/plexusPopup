//load quill editor (and insert notes if necessary)
function loadQuill(note) {
	quill = new Quill("#editor", {
		theme: "snow",
		placeholder: "Write something...",
		modules: {
			toolbar: false,
		},
	});

	quill.container.style.height = "200px";
	quill.container.style.padding = "12px 0px";
	if (note) quill.insertText(0, note.trim());
}

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function loadStoredNotes(notes) {
	let div = document.getElementById("storedNotes");
	let currentDate = new Date();

	const keys = Object.keys(notes);
	for (let i = keys.length - 1; i >= 0; i--) {
		let key = keys[i];
		let note = notes[key];

		//get formated date
		let dateString = "";
		let date = toDateTime(key);
		if (date.toDateString() == currentDate.toDateString()) dateString = formatAMPM(date);
		else dateString = days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate();

		//display date as title
		let title = document.createElement("h1");
		title.classList = "title storedNoteTitle";
		title.innerHTML = dateString;
		div.appendChild(title);

		//create div for new quill element
		let newEditor = document.createElement("div");
		newEditor.id = key;
		div.appendChild(newEditor);

		let horizontalLine = document.createElement("hr");
		horizontalLine.className = "horizontalLine";
		div.appendChild(horizontalLine)

		//create new quill editor within div
		let storedNote = new Quill(document.getElementById(key), {
			theme: "snow",
			modules: {
				toolbar: false,
			},
			readOnly: true,
		});

		//note style stuff
		storedNote.container.style.margin = "5px";
		storedNote.container.style.border = "none";
		storedNote.insertText(0, note.note.trim());
	}
}

//convet seconds key to date
function toDateTime(secs) {
	var t = new Date(1970, 0, 1); // Epoch
	t.setSeconds(secs);
	t.setDate(t.getDate()-1);
	t.setHours(t.getHours()+19);
	return t;
}

//convert date to hours
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
  }