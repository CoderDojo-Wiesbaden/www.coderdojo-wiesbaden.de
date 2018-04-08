lightDesign = false;
emailaddress = "coderdojo-team@bonifatius-wiesbaden.de"; //This will be shown on every page
phonenumber = "0611 1575394"; //This will be shown on every page

window.onload = function () {
	document.getElementById("mailaddress").innerHTML = emailaddress;
	document.getElementById("phonenumber").innerHTML = phonenumber;
	document.getElementById("designToggler").innerHTML += " (Beta)";
	updateDesign();
}

//Update Design
function updateDesign() {
	if (localStorage.getItem("design") == "light") {
		document.body.style.backgroundColor = "white";

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
		//separators = document.getElementsByClassName("separator");
		//for (var i = 0; i < subtexts.length; i++) {
		//	separators[i].src = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0+A8AAYUBQcxKiF0AAAAASUVORK5CYII=')";
		//}

		document.getElementById("headcoderdojo").style.color = "white";
		document.getElementById("headcoderdojo").style.backgroundColor = "#404040";
		document.getElementById("headboni").style.color = "#aaaaaa";
		document.getElementById("menu").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
		//document.getElementById("menuicon").style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI + PGc + PGc + Cgk8Zz4KCQk8cGF0aCBkPSJNNDkxLjMxOCwyMzUuMzE4SDIwLjY4MkM5LjI2LDIzNS4zMTgsMCwyNDQuNTc3LDAsMjU2czkuMjYsMjAuNjgyLDIwLjY4MiwyMC42ODJoNDcwLjYzNiAgICBjMTEuNDIzLDAsMjAuNjgyLTkuMjU5LDIwLjY4Mi0yMC42ODJDNTEyLDI0NC41NzgsNTAyLjc0MSwyMzUuMzE4LDQ5MS4zMTgsMjM1LjMxOHoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzQwNDA0MCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc + CgkJPHBhdGggZD0iTTQ5MS4zMTgsNzguNDM5SDIwLjY4MkM5LjI2LDc4LjQzOSwwLDg3LjY5OSwwLDk5LjEyMWMwLDExLjQyMiw5LjI2LDIwLjY4MiwyMC42ODIsMjAuNjgyaDQ3MC42MzYgICAgYzExLjQyMywwLDIwLjY4Mi05LjI2LDIwLjY4Mi0yMC42ODJDNTEyLDg3LjY5OSw1MDIuNzQxLDc4LjQzOSw0OTEuMzE4LDc4LjQzOXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzQwNDA0MCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc + CgkJPHBhdGggZD0iTTQ5MS4zMTgsMzkyLjE5N0gyMC42ODJDOS4yNiwzOTIuMTk3LDAsNDAxLjQ1NiwwLDQxMi44NzlzOS4yNiwyMC42ODIsMjAuNjgyLDIwLjY4Mmg0NzAuNjM2ICAgIGMxMS40MjMsMCwyMC42ODItOS4yNTksMjAuNjgyLTIwLjY4MlM1MDIuNzQxLDM5Mi4xOTcsNDkxLjMxOCwzOTIuMTk3eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojNDA0MDQwIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI + PC9wYXRoPgoJPC9nPgo8L2c + PC9nPiA8L3N2Zz4=')";
		//document.getElementById("banner").style.backgroundImage = "url('../../banner-light.jpg')";
		//document.getElementById(banner).style.backgroundColor = "white"; //Needs to be banner:after background-color

		document.getElementById("designToggler").innerHTML = "Dunkles Design";
	}
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




(function ($) {

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
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function (event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$menu._toggle();

			})
			.on('click', function (event) {

				// Hide.
				$menu._hide();

			})
			.on('keydown', function (event) {

				// Hide on escape.
				if (event.keyCode == 27)
					$menu._hide();

			});

	});

})(jQuery);