document.getElementById("menuicon").classList.remove("invisible");

function togglemenu() {
    document.getElementById("menu").classList.toggle("open");
}

/* Keyboard shortcuts */
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
 
    if (key == 27) {
        document.getElementById("menu").classList.toggle("open");
    } else if (key == 85 || key == 186) {
        if (document.getElementById("menu").classList.contains("open")) {
            window.location = "/wir";
        }
    } else if (key == 65 || key == 84) {
        if (document.getElementById("menu").classList.contains("open")) {
            window.location = "/anmelden";
        }
    } else if (key == 68) {
        if (document.getElementById("menu").classList.contains("open")) {
            window.location = "https://zen.coderdojo.com/dojos/de/wiesbaden/wiesbaden-at-st-bonifatius";
        }
    } else if (key == 66) {
        if (document.getElementById("menu").classList.contains("open")) {
            window.location = "https://blog.cdwi.de";
        }
    }
 }