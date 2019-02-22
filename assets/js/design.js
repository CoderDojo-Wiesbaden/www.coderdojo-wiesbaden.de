lightDesign = false;
baseUrl = "https://cdwi.de/";

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


window.onload = function () {
	document.getElementById("menuicon").innerHTML = "Menu";

	// For image lazy loading
	[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function () {
			img.removeAttribute('data-src');
		};
	});
}

function getNextDojoDate() {
	var fin = false;
	var newDate = new Date();
	var fail = 0;
	var months = [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember"
	]

	while (!fin) {
		fail++;
		if (fail > 10) {
			fin = true;
			return ("");
		}
		if (newDate.getDay() == 6 && newDate.getDate() <= 7) {
			return (newDate.getDate().toString().substring(0) + ". " + months[newDate.getMonth()]);
			fin = true;
		} else if (newDate.getDay() == 6) {
			var oldDate = newDate;
			newDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate() + 7);
		} else {
			var oldDate = newDate;
			newDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate() + 6 - oldDate.getDay());
		}
	}
}