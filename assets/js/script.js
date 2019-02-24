//Show the menu as JS is enabled
document.getElementById("menuicon").classList.remove("invisible");

//Toggles the menu
function togglemenu() {
    document.getElementById("menu").classList.toggle("open");
}

//Show the next meeting on the signup page
if (document.getElementById("eventstitle") != null) {
    document.getElementById("eventstitle").innerHTML = "Termine <span style='font-size: 0.8em'>• Nächstes Dojo: " + getNextDojoDate() + "</span>";
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

window.onload = function () {
    // For image lazy loading
    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function () {
            img.removeAttribute('data-src');
        };
    });
    [].forEach.call(document.querySelectorAll('div[data-bg]'), function (div) {
        div.style.backgroundImage = "url('" + div.getAttribute('data-bg') + "')";
        div.onload = function () {
            console.log("remove");
            div.removeAttribute('data-bg');
        };
    });
}

/* Keyboard shortcuts */
window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 27) {
        /* ESC - toggle menu */
        document.getElementById("menu").classList.toggle("open");
    } else if (key == 85 || key == 186 || key == 87) {
        /* U/Ü/W - About us */
        if (document.getElementById("menu").classList.contains("open")) {
            document.getElementById("menu").classList.remove("open")
            window.location = "/wir";
        }
    } else if (key == 65 || key == 84) {
        /* A/T - Signup */
        if (document.getElementById("menu").classList.contains("open")) {
            document.getElementById("menu").classList.remove("open")
            window.location = "/anmelden";
        }
    } else if (key == 68) {
        /* D - Direct signup */
        if (document.getElementById("menu").classList.contains("open")) {
            document.getElementById("menu").classList.remove("open")
            window.location = "https://zen.coderdojo.com/dojos/de/wiesbaden/wiesbaden-at-st-bonifatius";
        }
    } else if (key == 66) {
        /* B - Blog */
        if (document.getElementById("menu").classList.contains("open")) {
            document.getElementById("menu").classList.remove("open")
            window.location = "https://blog.cdwi.de";
        }
    } else if (key == 67 || key == 83) {
        /* S/C - Start */
        if (document.getElementById("menu").classList.contains("open")) {
            document.getElementById("menu").classList.remove("open")
            window.location = "/";
        }
    }
}