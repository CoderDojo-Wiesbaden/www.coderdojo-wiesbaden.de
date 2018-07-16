lightDesign = false;

var defaultnavs = [
	"home",
	"about",
	"signup",
	"signupdirect",
	"approach",
	"rooms",
	"resources",
	"workshops",
	"blog"
]

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

	setupDesign();
	updateDesign();

	// For image lazy loading
	[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function () {
			img.removeAttribute('data-src');
		};
		if (img.classList.contains("tileimg")) {
			setArticleImages();
		}
	});

	autosize(document.querySelectorAll('textarea'));

	Sortable.create(document.getElementById("editmenu-list"), {
		animation: 300,
		onEnd: function (event) {
			var children = event.to.children;
			var childids = []

			setCookie("menuorder", "", 0);

			for (var child of children) {
				childids[childids.length] = child.innerHTML.split("edit-")[1].split("\"")[0];
				setCookie("menuorder", getCookie("menuorder") + child.innerHTML.split("edit-")[1].split("\"")[0], 365);
			}
			console.log(getCookie("menuorder"));
		}
	});
}

//Set the design up
function setupDesign() {

	//Cookie warning
	if (getCookie("seenCookieWarning") != "yes") {
		document.getElementById("cookiewarning").classList.remove("hidden");
	}

	if (getCookie("shortcutsDisabled") == "disabled") {
		var editshortcuts = document.getElementById("toggleshortcuts");
		editshortcuts.classList.remove("special");
		editshortcuts.innerHTML = "Tastenkombinationen: Aus";

		var shortcutsToHide = document.getElementsByClassName("shortcutsToHide");
		for (var toHide of shortcutsToHide) {
			toHide.classList.add("hidden");
		}
	}

	if (document.getElementById("eventstitle") != null) {
		document.getElementById("eventstitle").innerHTML = "Termine <span style='font-size: 0.8em'>• Nächstes Dojo: " + getNextDojoDate() + "</span>";
	}

	if (getCookie("cookiesDisabled") == "disabled") {

		var editcookies = document.getElementById("editcookies");
		editcookies.classList.remove("special");
		editcookies.innerHTML = "Cookies: Aus";
		document.getElementById("editmenu-list").innerHTML = "Das personalisierte Menü ist nicht verfügbar, wenn die Cookies deaktiviert sind.";

	} else {

		var navs = getCookie("menuorder");
		navs = navs.split("nav-");
		navs.splice(0, 1);

		if (navs.length != defaultnavs.length && navs.length != 0) {
			console.error("Something with the menu order went wrong (too many or few items).");
			console.log(navs);
			navs = defaultnavs;
			setCookie("menuorder", "", 10);
			console.log("Reseting menu order.");
		} else if (navs.length == 0) {
			navs = defaultnavs;
		}
		if (getCookie("nav-home") == "") {
			setCookie("nav-home", "enabled", 10);
		}
		if (getCookie("nav-signup") == "") {
			setCookie("nav-signup", "enabled", 10);
		}
		if (getCookie("nav-signupdirect") == "") {
			setCookie("nav-signupdirect", "special", 10);
		}
		if (getCookie("nav-approach") == "") {
			setCookie("nav-approach", "disabled", 10);
		}
		if (getCookie("nav-rooms") == "") {
			setCookie("nav-rooms", "disabled", 10);
		}
		if (getCookie("nav-resources") == "") {
			setCookie("nav-resources", "disabled", 10);
		}
		if (getCookie("nav-workshops") == "") {
			setCookie("nav-workshops", "disabled", 10);
		}
		if (getCookie("nav-blog") == "") {
			setCookie("nav-blog", "enabled", 10);
		}


		console.log(navs);

		var navnames = {
			home: "Start",
			about: "&Uuml;ber uns",
			signup: "Termine &amp; Anmeldung",
			signupdirect: "Direkte Anmeldung",
			approach: "Anfahrt",
			rooms: "R&auml;ume",
			resources: "Ressourcen",
			workshops: "Workshops",
			blog: "Blog"
		};
		var navlinks = {
			home: "index.html",
			about: "willkommen.html",
			signup: "anmeldung.html",
			signupdirect: "https://zen.coderdojo.com/dojos/de/wiesbaden/wiesbaden-at-st-bonifatius",
			approach: "anfahrt.html",
			rooms: "raeumlichkeiten.html",
			resources: "ressourcen.html",
			workshops: "workshops.html",
			blog: "https://blog.cdwi.de"
		};
		var i = 0;

		document.getElementById("menu-list").innerHTML = "";
		document.getElementById("editmenu-list").innerHTML = "";

		for (var nav of navs) {

			if (getCookie("nav-" + nav) == "enabled" || "special") {
				var menuElement = document.createElement("li");
				if (getCookie("nav-" + nav) == "special") {
					menuElement.innerHTML = "<a id=\"nav-" + nav + "-link\" href=\"" + navlinks[nav] + "\" class=\"button special fit\">" + navnames[nav] + "</a>";
				} else {
					menuElement.innerHTML = "<a id=\"nav-" + nav + "-link\" href=\"" + navlinks[nav] + "\" class=\"special fit\">" + navnames[nav] + "</a>";
				}
				menuElement.id = "nav-" + nav;
				document.getElementById("menu-list").appendChild(menuElement);
			}

			var editElement = document.createElement("li");
			editElement.innerHTML = "<button id=\"edit-nav-" + nav + "\" onclick=\"editmenu('nav-" + nav + "')\" class=\"button special\" style=\"width: 85%;\">" + navnames[nav] + "<button id=\"edit-star-nav-" + nav + "\" onclick=\"starmenu('nav-" + nav + "')\" class=\"icon fa-star\" style=\"width: 15%; height: 100%; padding-right: 0\"></button></button>";
			document.getElementById("editmenu-list").appendChild(editElement);

			var cookie = getCookie("nav-" + nav);
			var navelement = document.getElementById("nav-" + nav);
			var navlinkelement = document.getElementById("nav-" + nav + "-link");
			var editnavelement = document.getElementById("edit-nav-" + nav);
			var editstarnavelement = document.getElementById("edit-star-nav-" + nav);

			if (cookie == "disabled") {
				navelement.classList.add("hidden");
				editnavelement.classList.remove("special");
				editstarnavelement.classList.add("hidden");
				console.log("DISABLED: " + nav);
			} else if (cookie == "disabledspecial") {
				navelement.classList.add("hidden");
				editnavelement.classList.remove("special");
				editstarnavelement.classList.add("special");
				editstarnavelement.classList.add("hidden");
				console.log("DISABLED_SPECIAL: " + nav);
			} else if (cookie == "enabled") {
				navelement.classList.remove("hidden");
				navlinkelement.classList.remove("button");
				console.log("ENABLED: " + nav);
			} else if (cookie == "special") {
				navelement.classList.remove("hidden");
				navlinkelement.classList.add("button");
				editstarnavelement.classList.add("special");
				console.log("SPECIAL: " + nav);
			}
		}

		var isChrome = !!window.chrome && !!window.chrome.webstore;
		if (!isChrome) {
			document.getElementById("editmenu-list").innerHTML = "In einigen Browsern musst du zum Sortieren dicht außerhalb der Schaltflächen ziehen."
				+ "<div style='height:2em'></div>" + document.getElementById("editmenu-list").innerHTML;
		}
	}
}

//Update Design
function updateDesign() {
	if (localStorage.getItem("design") == "standard") {
		document.getElementById("standardThemeBtn").classList.add("special");
		document.getElementById("whiteThemeBtn").classList.remove("special");
		document.getElementById("grayThemeBtn").classList.remove("special");
		
	} else if (localStorage.getItem("design") == "white") {
		document.getElementById("whiteThemeBtn").classList.add("special");
		document.getElementById("standardThemeBtn").classList.remove("special");
		document.getElementById("grayThemeBtn").classList.remove("special");
		
		

		objects = document.getElementsByClassName("theme");
		for (var i = 0; i < objects.length; i++) {
			objects[i].classList.add("whitetheme");
		}

		document.body.classList.remove("imgoverlay");
		document.body.classList.add("imgoverlaylight");

	} else if (localStorage.getItem("design") == "gray") {
		document.getElementById("grayThemeBtn").classList.add("special");
		document.getElementById("standardThemeBtn").classList.remove("special");
		document.getElementById("whiteThemeBtn").classList.remove("special");
		
	}
}

//Theme chooser
function chooseStandardTheme() {
	localStorage.setItem("design", "standard");
	location.reload();
}
function chooseWhiteTheme() {
	localStorage.setItem("design", "white");
	updateDesign();
}
function chooseGrayTheme() {
	localStorage.setItem("design", "gray");
	updateDesign();
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