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

const imageGalleryContainers = [...document.getElementsByClassName('image-gallery-container')]
imageGalleryContainers.forEach(imageGallery => {
	const gallery = imageGallery.querySelector('.image-gallery');
	let scrollable = gallery.scrollWidth - gallery.clientWidth;

	// enables horizontal scrolling on horizontally scrollable image galleries
	gallery.addEventListener('wheel', galleryScroll)

	// vars for clicking to navigate photos
	const leftScroll = imageGallery.querySelector('.gs-left');
	const rightScroll = imageGallery.querySelector('.gs-right');
	leftScroll.addEventListener('click', galleryButtonScroll)
	rightScroll.addEventListener('click', galleryButtonScroll)

	// for storing an array of widths for the scrollbuttons to traverse
	let imageWidths;

	handleOverflow();
	window.addEventListener('resize', handleOverflow)

	//do stuff with galleries that have overflow
	function handleOverflow() {
		scrollable = gallery.scrollWidth - gallery.clientWidth
		if (gallery.scrollWidth > gallery.clientWidth) {
			// queue of images for the left/right scroll buttons to go through
			// turn it into a doubly linked list with just widths to scroll to/from 
			const imageQueue = [...gallery.getElementsByClassName('gallery-image')]
			let imageWidthAcc = 0;
			imageWidths = imageQueue.map(image => {
				imageWidthAcc += image.clientWidth;
				return imageWidthAcc
			})

			// enable left/right scroll buttons
			leftScroll.classList.remove('hidden')
			rightScroll.classList.remove('hidden')

		} else {
			leftScroll.classList.add('hidden')
			rightScroll.classList.add('hidden')
		}
	}

	function galleryScroll(e) {
		//allow scrolling up/down again once left/rightmost picture is reached 
		if (gallery.scrollLeft <= 0 && e.deltaY < 0) return;
		if (gallery.scrollLeft >= scrollable && e.deltaY > 0) return;
		e.preventDefault();
		if (e.deltaY !== 0) {
			gallery.scrollLeft += e.deltaY;
		}
	}
	function galleryButtonScroll(e) {
		let imageIndex = imageWidths.findIndex(width => width >= gallery.scrollLeft)
		console.log(imageIndex)
		if (e.target.classList.contains('gs-left')) {
			if (imageIndex > 0) {
				gallery.scrollTo(imageWidths[imageIndex - 1], 0)
			}
			else {
				gallery.scrollTo(0, 0)
			}
		} else if (e.target.classList.contains('gs-right')) {
			gallery.scrollTo(imageWidths[imageIndex]+5, 0)
		}
		console.log('button click', e.target.classList.contains('gs-left'))
	}

	// enlarge images on click
	const images = gallery.getElementsByClassName('gallery-image');
	Array.from(images).forEach(image => {
		image.addEventListener('click', (e) => {
			console.log('picture', e.target)
		})
	})
})