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

// need to add some logic for resizing, since atm, things are set once at the beginning,
// and if the window wasn't overflowing at the beginning, then it won't horizontally scroll or anything after a resize
// also rewrite to use the container so that it's easier to manipulate the left and right arrows
const imageGalleryContainers = [...document.getElementsByClassName('image-gallery-container')]
imageGalleryContainers.forEach(imageGallery => {
	const gallery = imageGallery.querySelector('.image-gallery');
	const leftScroll = imageGallery.querySelector('.gs-left');
	const rightScroll = imageGallery.querySelector('.gs-right');
	
	handleOverflow();
	window.addEventListener('resize', handleOverflow)



	//do stuff with galleries that have overflow
	function handleOverflow() {
		if (gallery.scrollWidth > gallery.clientWidth) {
			// enables horizontal scrolling on horizontally scrollable image galleries
			gallery.addEventListener('wheel', galleryScroll)
			leftScroll.classList.remove('hidden')
			rightScroll.classList.remove('hidden')
			// need to add left/right buttons for navigating photos when they're in a scrollable container
			// console.log('left', Array.from(leftScroll))
		} else {
			leftScroll.classList.add('hidden')
			rightScroll.classList.add('hidden')
			gallery.removeEventListener('wheel', galleryScroll)	// doesn't seem to do anything. need to figure out why
		}

		function galleryScroll(e) {
			const scrollable = gallery.scrollWidth - gallery.clientWidth;
			//allow scrolling up/down again once left/rightmost picture is reached 
			if (gallery.scrollLeft <= 0 && e.deltaY < 0) return;
			if (gallery.scrollLeft >= scrollable && e.deltaY > 0) return;
			e.preventDefault();
			if (e.deltaY !== 0) {
				gallery.scrollLeft += e.deltaY;
			} else if (e.deltaX !== 0) {
				gallery.scrollLeft += e.deltaX;
			}
		}
	}


	// enlarge images on click
	const images = gallery.getElementsByClassName('gallery-image');
	Array.from(images).forEach(image => {
		image.addEventListener('click', (e) => {
			console.log(e.target)
		})
	})
})