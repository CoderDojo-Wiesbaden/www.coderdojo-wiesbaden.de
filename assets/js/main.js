
function deleteCookie(cname) {
	var d = new Date();
	d.setTime(d.getTime() + 10000);
	document.cookie = cname + "=" + "" + ";expires=" + d.toUTCString + ";path=/";
}

//Toggle design
function toggleDesign() {
	if (localStorage.getItem("design") == "dark") {
		localStorage.removeItem("design");
		localStorage.setItem("design", "light");
		document.getElementById("designToggler").innerHTML = "Dunkles Design";
		updateDesign();
	} else {
		localStorage.removeItem("design");
		localStorage.setItem("design", "dark");
		location.reload();
	}
}

// Highlight contact for better visibility
function highlightContact() {
	//Coming soon
}

function seenCookieWarning() {
	setCookie("seenCookieWarning", "yes", 356);
	document.getElementById("cookiewarning").classList.add("hidden");
}
function hideCookieWarning() {
	// User clicked "X" on the cookie warning. Hiding the warning for this session.
	console.log("Hiding the cookie warning for this session.")
	document.getElementById('cookiewarning').classList.add('hidden')
	document.cookie = "seenCookieWarning" + "=" + "yes" + ";path=/";
}
function disableCookies() {
	setCookie("cookiesDisabled", "disabled", 356);
	console.log("Disabled future cookies.")
	deleteCookie("menuorder");
	for (var nav of defaultnavs) {
		deleteCookie("nav-" + nav);
	}
	console.log("Deleted cookies.");
	document.getElementById("cookiewarning").classList.add("hidden");
	setCookie("seenCookieWarning", "yes", 356);
	editcookies.classList.remove("special");
	editcookies.innerHTML = "Cookies: Aus";
	document.getElementById("editmenu-list").innerHTML = "Das personalisierte Menü ist nicht verfügbar, wenn die Cookies deaktiviert sind.";
}

function toggleCookies() {
	var editcookies = document.getElementById("editcookies");

	if (getCookie("cookiesDisabled") == "disabled") {
		// Enable Cookies
		deleteCookie("cookiesDisabled");
		editcookies.classList.add("special");
		editcookies.innerHTML = "Cookies: An";

		if (document.getElementById("editmenu-list").innerHTML.startsWith("Das")) {
			document.getElementById("editmenu-list").innerHTML = "<a onclick='location.reload()'>Bitte lade die Seite neu, um das personalisierte Menü zu aktivieren.</a>";
		}

	} else {
		// Disable Cookies
		disableCookies();
		editcookies.classList.remove("special");
		editcookies.innerHTML = "Cookies: Aus";
		document.getElementById("editmenu-list").innerHTML = "Das personalisierte Menü ist nicht verfügbar, wenn die Cookies deaktiviert sind.";
	}
}

function toggleShortcuts() {
	var editshortcuts = document.getElementById("toggleshortcuts");

	if (getCookie("shortcutsDisabled") == "disabled") {
		// Enable Shortcuts
		deleteCookie("shortcutsDisabled");
		editshortcuts.classList.add("special");
		editshortcuts.innerHTML = "Tastenkombinationen: An";

		var shortcutsToHide = document.getElementsByClassName("shortcutsToHide");
		for (var toHide of shortcutsToHide) {
			toHide.classList.remove("hidden");
		}

	} else {
		// Disable Shortcuts
		setCookie("shortcutsDisabled", "disabled", 356);
		editshortcuts.classList.remove("special");
		editshortcuts.innerHTML = "Tastenkombinationen: Aus";

		var shortcutsToHide = document.getElementsByClassName("shortcutsToHide");
		for (var toHide of shortcutsToHide) {
			toHide.classList.add("hidden");
		}

	}
}

function resetmenu() {
	var additionalToRemove = [
		"cookiesDisabled",
		"menuorder",
		"seenCookieWarning"
	]

	for (var x of additionalToRemove) {
		deleteCookie(x);
	}

	for (var nav of defaultnavs) {
		deleteCookie("nav-" + nav);
	}

	location.reload();
}

function editmenu(element) {
	if (document.getElementById(element).classList.contains("hidden")) {
		document.getElementById(element).classList.remove("hidden");
		document.getElementById("edit-" + element).classList.add("special");
		document.getElementById("edit-star-" + element).classList.remove("hidden");
		setCookie(element, "enabled", 365);
	} else {
		document.getElementById(element).classList.add("hidden");
		document.getElementById("edit-" + element).classList.remove("special");
		document.getElementById("edit-star-" + element).classList.add("hidden");
		if (getCookie(element) == "special") {
			setCookie(element, "disabledspecial", 365);
		} else {
			setCookie(element, "disabled", 365);
		}
	}
}
function starmenu(element) {
	if (document.getElementById(element + "-link").classList.contains("button")) {
		document.getElementById(element + "-link").classList.remove("button");
		document.getElementById("edit-star-" + element).classList.remove("special");
		setCookie(element, "enabled", 365);
	} else {
		document.getElementById(element + "-link").classList.add("button");
		document.getElementById("edit-star-" + element).classList.add("special");
		setCookie(element, "special", 365);
	}
}

/* Readout feature */
function toggleAudio(file, button) {
	var playClass = "fa-volume-up",
		stopClass = "fa-stop";

	var player = document.getElementById("audioPlayer");
	var source = document.getElementById("audioSource");

	if (player.paused) {
		//Change source if necessary
		if (!source.src.endsWith(file)) {
			source.src = "audio/" + file;
			player.load();
		}
		//Play and change button text
		player.play();
		button.classList.remove(playClass);
		button.classList.add(stopClass);
	} else {
		//Pause, Reset time (start at the beginning next time) and change button text
		player.pause();
		player.currentTime = 0;
		button.classList.remove(stopClass);
		button.classList.add(playClass);
		//If the button for another file has been triggered without pausing the last playing file,
		//change the source, play it and change the text of all buttons (since we dont know what was playing last)
		if (!source.src.endsWith(file)) {
			source.src = "audio/" + file;
			player.load();
			player.play();
			Array.prototype.forEach.call(document.getElementsByClassName("readoutbutton"), function (element, index, array) {
				element.classList.remove(stopClass);
				element.classList.add(playClass);
			});
			button.classList.remove(playClass);
			button.classList.add(stopClass);
		}
	}
}

function setStopAudioIcon() {
	Array.prototype.forEach.call(document.getElementsByClassName("readoutbutton"), function (element, index, array) {
		element.classList.remove("fa-stop");
		element.classList.add("fa-volume-up");
	});
}

function setArticleImages() {
	var $tiles = $('.tiles > article');

	$tiles.each(function () {

		var $this = $(this),
			$image = $this.find('.image'), $img = $image.find('img'),
			$link = $this.find('.link'), $linkNoAnim = $this.find('.linkNoAnim'),
			x;

		// Image.

		// Set image.
		$this.css('background-image', 'url(' + $img.attr('src') + ')');
	});
}


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


(function ($) {

	$("#audioPlayer").on("ended", setStopAudioIcon);

	if ($("#includeFooter") != null && document.getElementById("includeFooter").innerHTML == "") {
		$("#includeFooter").load("../../footer.html");
	}


	// Add smooth scrolling to all links	
	$("a").on('click', function (event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});


	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (skel.vars.browser == 'ie' || skel.vars.browser == 'edge' || skel.vars.mobile) ? function () { return $(this) } : function (intensity) {

		var $window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i = 0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function () {

			var $t = $(this),
				on, off;

			on = function () {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function () {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function () {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			skel.on('change', function () {

				if (skel.breakpoint('medium').active)
					(off)();
				else
					(on)();

			});

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function () {
				$window.trigger('scroll');
			});

		return $(this);

	};

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load pageshow', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Clear transitioning state on unload/hide.
		$window.on('unload pagehide', function () {
			window.setTimeout(function () {
				$('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

		// Fix: Enable IE-only tweaks.
		if (skel.vars.browser == 'ie' || skel.vars.browser == 'edge')
			$body.addClass('is-ie');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Scrolly.
		$('.scrolly').scrolly({
			offset: function () {
				return $header.height() - 2;
			}
		});

		// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function () {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'), $linkNoAnim = $this.find('.linkNoAnim'),
				x;

			// Image.

			// Set image.
			$this.css('background-image', 'url(' + $img.attr('src') + ')');

			// Set position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide original.
			$image.hide();

			// Link.
			if ($link.length > 0) {

				$x = $link.clone()
					.text('')
					.addClass('primary')
					.appendTo($this);

				$link = $link.add($x);

				$link.on('click', function (event) {

					var href = $link.attr('href');

					// Prevent default.
					event.stopPropagation();
					event.preventDefault();

					// Start transitioning.
					$this.addClass('is-transitioning');
					$wrapper.addClass('is-transitioning');

					// Redirect.
					window.setTimeout(function () {

						if ($link.attr('target') == '_blank')
							window.open(href);
						else
							location.href = href;

					}, 500);

				});

			} else if ($linkNoAnim.length > 0) {

				$x = $linkNoAnim.clone()
					.text('')
					.addClass('primary')
					.appendTo($this);

				$linkNoAnim = $linkAnim.add($x);

				$linkNoAnim.on('click', function (event) {

					var href = $link.attr('href');

					// Prevent default.
					event.stopPropagation();
					event.preventDefault();

					// Start transitioning.
					$this.addClass('is-transitioning');
					$wrapper.addClass('is-transitioning');

					// Redirect.
					window.setTimeout(function () {

						if ($linkNoAnim.attr('target') == '_blank')
							window.open(href);
						else
							location.href = href;

					}, 500);

				});

			}

		});

		// Header.
		if (skel.vars.IEVersion < 9)
			$header.removeClass('alt');

		if ($banner.length > 0
			&& $header.hasClass('alt')) {

			$window.on('resize', function () {
				$window.trigger('scroll');
			});

			$window.on('load', function () {

				$banner.scrollex({
					bottom: $header.height() + 10,
					terminate: function () { $header.removeClass('alt'); },
					enter: function () { $header.addClass('alt'); },
					leave: function () { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function () {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

		// Banner.
		$banner.each(function () {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
			$this._parallax(0.275);

			// Image.
			if ($image.length > 0) {

				// Set image.
				$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Hide original.
				$image.hide();

			}

		});

		// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function () {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function () {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function () {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function () {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function () {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function (event) {
				event.stopPropagation();
			})
			.on('click', 'a', function (event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$menu._hide();

				// Redirect.
				window.setTimeout(function () {
					window.location.href = href;
				}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function (event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Schließen</a>')
			.append('<a class="edit" onclick="showeditmenu();">Bearbeiten</a>');

		// Contact form
		var $nachricht = $('#nachricht'),
			$nachrichtInner;

		$nachricht.wrapInner('<div class="inner"></div>');
		$nachrichtInner = $nachricht.children('.inner');
		$nachricht._locked = false;

		$nachricht._lock = function () {

			if ($nachricht._locked)
				return false;

			$nachricht._locked = true;

			window.setTimeout(function () {
				$nachricht._locked = false;
			}, 350);

			return true;

		};

		$nachricht._show = function () {

			if ($nachricht._lock())
				$body.addClass('is-nachricht-visible');

		};

		$nachricht._hide = function () {

			if ($nachricht._lock())
				$body.removeClass('is-nachricht-visible');

		};

		$nachricht._toggle = function () {

			if ($nachricht._lock())
				$body.toggleClass('is-nachricht-visible');

		};

		$nachrichtInner
			.on('click', function (event) {
				event.stopPropagation();
			})
			.on('click', 'a', function (event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$nachricht._hide();

				// Redirect.
				window.setTimeout(function () {
					window.location.href = href;
				}, 250);

			});

		$nachricht
			.appendTo($body)
			.on('click', function (event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-nachricht-visible');

			})
			.append('<a class="close" href="#nachricht">Schließen</a>');

		// Edit menu
		var $editmenu = $('#editmenu'),
			$editmenuInner;

		$editmenu.wrapInner('<div class="inner"></div>');
		$editmenuInner = $editmenu.children('.inner');
		$editmenu._locked = false;

		$editmenu._lock = function () {

			if ($editmenu._locked)
				return false;

			$editmenu._locked = true;

			window.setTimeout(function () {
				$editmenu._locked = false;
			}, 350);

			return true;

		};

		$editmenu._show = function () {

			if ($editmenu._lock())
				$body.addClass('is-editmenu-visible');

		};

		$editmenu._hide = function () {

			if ($editmenu._lock())
				$body.removeClass('is-editmenu-visible');

		};

		$editmenu._toggle = function () {

			if ($editmenu._lock())
				$body.toggleClass('is-editmenu-visible');

		};

		$editmenuInner
			.on('click', function (event) {
				event.stopPropagation();
			})
			.on('click', 'a', function (event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$editmenu._hide();

				// Redirect.
				window.setTimeout(function () {
					window.location.href = href;
				}, 250);

			});

		$editmenu
			.appendTo($body)
			.on('click', function (event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-editmenu-visible');
				$menu._show();

			})
			.append('<a class="close" href="#editmenu">Schließen</a>')
			.append('<a class="reset" onclick="resetmenu()">Zurücksetzen</a>');




		$body
			.on('click', 'a[href="#menu"]', function (event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$menu._toggle();

			})
			.on('click', 'a[href="#nachricht"]', function (event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$nachricht._toggle();

			})
			.on('click', 'a[href="#editmenu"]', function (event) {

				event.stopPropagation();
				event.preventDefault();

				// Hide menu, open edit menu.
				$editmenu._show();
				$menu._hide();

			})
			.on('keydown', function (event) {

				// Toggle menu / hide contact form on escape, show contact form on enter.
				if (getCookie("shortcutsDisabled") != "disabled") {
					if (event.keyCode == 27) {
						if ($body.hasClass("is-nachricht-visible")) {
							$nachricht._hide();
						} else if ($body.hasClass("is-editmenu-visible")) {
							$editmenu._hide();
							$menu._show();
						} else {
							$menu._toggle();
						}
					} else if (event.keyCode == 13) {
						if ($body.hasClass("is-menu-visible")) {
							$menu._hide();
						}
						if ($body.hasClass("is-editmenu-visible")) {
							$editmenu._hide();
						}
						$nachricht._show();
					}
				} else {
					if (event.keyCode == 27) {
						$menu._toggle();
					}
				}

			});

	});

})(jQuery);

function showeditmenu() {
	document.body.classList.add("is-editmenu-visible");
}

// Key listener
// Why is it down here? I don't know, it doesn't work else.
// Settings on 'e', home on 's'
window.onkeyup = function (e) {
	if (!document.body.classList.contains("is-nachricht-visible")) {
		if (getCookie("shortcutsDisabled") != "disabled") {
			var key = e.keyCode ? e.keyCode : e.which;

			if (key == 69) {
				if (document.body.classList.contains("is-editmenu-visible")) {
					document.body.classList.remove("is-editmenu-visible");
				} else {
					showeditmenu();
				}
			} else if (key == 83) {
				window.location = "../../index.html";
			}
		}
	}
}