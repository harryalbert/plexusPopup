//format note's date based on current date
function formatDate(key, currentDate) {
	//get formated date
	let dateString = "";
	let date = toDateTime(key);
	if (date.toDateString() == currentDate.toDateString())
		dateString = "today at " + formatAMPM(date);
	else if (
		date.getYear() == currentDate.getYear() &&
		date.getWeekNumber() == currentDate.getWeekNumber()
	) {
		dateString = days[date.getDay()];
	} else
		dateString =
			days[date.getDay()] +
			" " +
			months[date.getMonth()] +
			" " +
			date.getDate();

	return dateString;
}

//convert seconds key to date
function toDateTime(secs) {
	var t = new Date(1970, 0, 1); // Epoch
	t.setSeconds(secs);
	t.setDate(t.getDate() - 1);
	t.setHours(t.getHours() + 19);
	return t;
}

//convert date to hours
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;
	var strTime = hours + ":" + minutes + " " + ampm;
	return strTime;
}

//get numbered week of year (for testing if two dates are in the same week)
Date.prototype.getWeekNumber = function () {
	var d = new Date(
		Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
	);
	var dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];