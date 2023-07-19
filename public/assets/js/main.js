/*
	Striped by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$document = $(document);

	// Breakpoints.
	breakpoints({
		desktop: ['737px', null],
		wide: ['1201px', null],
		narrow: ['737px', '1200px'],
		narrower: ['737px', '1000px'],
		mobile: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.

	// Height hack.
	/*
		var $sc = $('#sidebar, #content'), tid;

		$window
			.on('resize', function() {
				window.clearTimeout(tid);
				tid = window.setTimeout(function() {
					$sc.css('min-height', $document.height());
				}, 100);
			})
			.on('load', function() {
				$window.trigger('resize');
			})
			.trigger('resize');
	*/

	// Title Bar.
	$(
		'<div id="titleBar">' +
		'<a href="#sidebar" class="toggle"></a>' +
		'<span class="title">' + $('#logo').html() + '</span>' +
		'</div>'
	)
		.appendTo($body);

	// Sidebar
	$('#sidebar')
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'sidebar-visible'
		});

})(jQuery);

// enables horizontal scrolling on horizontally scrollable image galleries
const imageGalleries = document.getElementsByClassName('image-gallery');
Array.from(imageGalleries).forEach(gallery => {
	console.log(gallery)
	gallery.addEventListener('wheel', (e) => {
		const scrollable = gallery.scrollWidth - gallery.clientWidth;
		if (gallery.scrollLeft <= 0 && e.deltaY < 0) return;
		if (gallery.scrollLeft >= scrollable && e.deltaY > 0) return;
		e.preventDefault();
		if (e.deltaY !== 0) {
			gallery.scrollLeft += e.deltaY;
		} else if (e.deltaX !== 0) {
			gallery.scrollLeft += e.deltaX;
		}
	})

	// let isMouseDown = false;
	// let lastOffsetX = 0;
	// gallery.addEventListener("mouseup", () => {
	// 	isMouseDown = false;
	// })
	// gallery.addEventListener('mousedown', (e) => {
	// 	isMouseDown = true;
	// 	lastOffsetX = e.offsetX;
	// })
	// gallery.addEventListener("mousemove", (e) => {
	// 	e.preventDefault();
	// 	if (isMouseDown) {
	// 		// while (e.target === gallery) {
	// 		console.log(e.target, e.offsetX)
	// 		// }
	// 	}
	// })
})