lightDesign = false;
emailaddress = "coderdojo-team@bonifatius-wiesbaden.de"; //This will be shown on every page
phonenumber = "0611 1575394"; //This will be shown on every page

var defaultnavs = [
	"home",
	"about",
	"signup",
	"signupdirect",
	"approach",
	"rooms",
	"resources",
	"workshops"
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
	document.getElementById("mailaddress").innerHTML = emailaddress;
	document.getElementById("phonenumber").innerHTML = phonenumber;
	document.getElementById("designToggler").innerHTML += " (Beta)";

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
		for(var toHide of shortcutsToHide) {
			toHide.classList.add("hidden");
		}
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


		console.log(navs);

		var navnames = {
			home: "Start",
			about: "&Uuml;ber uns",
			signup: "Termine &amp; Anmeldung",
			signupdirect: "Direkte Anmeldung",
			approach: "Anfahrt",
			rooms: "R&auml;ume",
			resources: "Ressourcen",
			workshops: "Workshops"
		};
		var navlinks = {
			home: "index.html",
			about: "willkommen.html",
			signup: "anmeldung.html",
			signupdirect: "https://zen.coderdojo.com/dojos/de/wiesbaden/wiesbaden-at-st-bonifatius",
			approach: "anfahrt.html",
			rooms: "raeumlichkeiten.html",
			resources: "ressourcen.html",
			workshops: "workshops.html"
		};
		var i = 0;

		document.getElementById("menu-list").innerHTML = "";
		document.getElementById("editmenu-list").innerHTML = "";

		for (var nav of navs) {

			if (getCookie("nav-" + nav) == "enabled" || "special") {
				var menuElement = document.createElement("li");
				if (getCookie("nav-" + nav) == "special") {
					menuElement.innerHTML = "<a id=\"nav-" + nav + "-link\" href=\"" + navlinks[nav] + "\" class=\"button special fit dark\">" + navnames[nav] + "</a>";
				} else {
					menuElement.innerHTML = "<a id=\"nav-" + nav + "-link\" href=\"" + navlinks[nav] + "\" class=\"special fit dark\">" + navnames[nav] + "</a>";
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

	if (localStorage.getItem("design") == "light") {
		document.body.style.backgroundColor = "white";
		document.body.classList.remove("imgoverlay");
		document.body.classList.add("imgoverlaylight");

		texts = document.getElementsByClassName("dark");
		for (var i = 0; i < texts.length; i++) {
			texts[i].style.color = "#404040";
		}

		buttons = document.getElementsByClassName("button dark");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.boxShadow = "0 0 0 2px #aaaaaa";
		}

		specialbuttons = document.getElementsByClassName("special button dark");
		for (var i = 0; i < specialbuttons.length; i++) {
			specialbuttons[i].style.backgroundColor = "#404040";
			specialbuttons[i].style.boxShadow = "0 0 0 2px #404040";
			specialbuttons[i].style.color = "white";
		}

		subtexts = document.getElementsByClassName("subdark");
		for (var i = 0; i < subtexts.length; i++) {
			subtexts[i].style.color = "#aaaaaa";
		}

		document.getElementById("headcoderdojo").style.color = "white";
		document.getElementById("headcoderdojo").style.backgroundColor = "#404040";
		document.getElementById("headboni").style.color = "#aaaaaa";
		document.getElementById("menu").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
		document.getElementById("nachricht").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
		document.getElementById("designToggler").innerHTML = "Dunkles Design";

		//separators = document.getElementsByClassName("separator");
		//for (var i = 0; i < subtexts.length; i++) {
		//	separators[i].src = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0+A8AAYUBQcxKiF0AAAAASUVORK5CYII=')";
		//}
		//document.getElementById("menuicon").style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI + PGc + PGc + Cgk8Zz4KCQk8cGF0aCBkPSJNNDkxLjMxOCwyMzUuMzE4SDIwLjY4MkM5LjI2LDIzNS4zMTgsMCwyNDQuNTc3LDAsMjU2czkuMjYsMjAuNjgyLDIwLjY4MiwyMC42ODJoNDcwLjYzNiAgICBjMTEuNDIzLDAsMjAuNjgyLTkuMjU5LDIwLjY4Mi0yMC42ODJDNTEyLDI0NC41NzgsNTAyLjc0MSwyMzUuMzE4LDQ5MS4zMTgsMjM1LjMxOHoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzQwNDA0MCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc + CgkJPHBhdGggZD0iTTQ5MS4zMTgsNzguNDM5SDIwLjY4MkM5LjI2LDc4LjQzOSwwLDg3LjY5OSwwLDk5LjEyMWMwLDExLjQyMiw5LjI2LDIwLjY4MiwyMC42ODIsMjAuNjgyaDQ3MC42MzYgICAgYzExLjQyMywwLDIwLjY4Mi05LjI2LDIwLjY4Mi0yMC42ODJDNTEyLDg3LjY5OSw1MDIuNzQxLDc4LjQzOSw0OTEuMzE4LDc4LjQzOXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzQwNDA0MCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc + CgkJPHBhdGggZD0iTTQ5MS4zMTgsMzkyLjE5N0gyMC42ODJDOS4yNiwzOTIuMTk3LDAsNDAxLjQ1NiwwLDQxMi44NzlzOS4yNiwyMC42ODIsMjAuNjgyLDIwLjY4Mmg0NzAuNjM2ICAgIGMxMS40MjMsMCwyMC42ODItOS4yNTksMjAuNjgyLTIwLjY4MlM1MDIuNzQxLDM5Mi4xOTcsNDkxLjMxOCwzOTIuMTk3eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojNDA0MDQwIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI + PC9wYXRoPgoJPC9nPgo8L2c + PC9nPiA8L3N2Zz4=')";
		//document.getElementById("banner").style.backgroundImage = "url('../../banner-light.jpg')";
		//document.getElementById(banner).style.backgroundColor = "white"; //Needs to be banner:after background-color
	}
}