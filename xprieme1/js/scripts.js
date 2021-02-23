/*global $, jQuery */

/* ---------------------------------------------------
Template Name: Xprieme
Description: Responsive HTML5 / CSS3 Multi-pages Portfolio-Resume Template
Version: 1.0
Author: Ahmed Beheiry 
URL: https://themeforest.net/user/ahmedbeheiry

/* ---------------------------------------------------
	*** Table Of Content:
-----------------------------------------------------
1 - Preloader Page 
2 - Give the full size hero full height of the screen
3 - Adding backgrounds to sections 
4 - Navbar Affix
5 - Back to top Button 
6 - Parallax Effect
7 - Skills bars with animation 
8 - Testimonial Carousel 
9 - Clients Carousel
10 - Count To Numbers
11 - Contact Form Validation
12 - Blog Comment Form Validation
13 - Google Map 
----------------------------------------------------- */

(function($) {
	"use strict";

	/* ---------------------------------------------------
		1 - Preloader Page 
	----------------------------------------------------- */
	$(window).on('load', function() {
		$('.preloader').delay(400).fadeOut(500);
	});

	/* ---------------------------------------------------
		2 - Give the full size hero full height of the screen 
	----------------------------------------------------- */
	var fullSizeHero = $('.full-size-hero');
	fullSizeHero.height($(window).height());
	$(window).on('resize', function() {
		fullSizeHero.height($(window).height());
	});
	
	/* ---------------------------------------------------
		3 - Adding backgrounds to sections
	----------------------------------------------------- */
	var hasBg = $('.has-bg');
	hasBg.each(function() {
		var bgSrc = $(this).attr('data-bg-url'),
			bgUrl = "url('"+ bgSrc +"')";
		$(this).css('backgroundImage', bgUrl);
	});
	
	/* ---------------------------------------------------
		4 - Navbar Affix
	----------------------------------------------------- */
	var navAffix = $('.transparent-header nav');
	navAffix.affix({
		offset: {
			top: 50
		}
	});

	/* ---------------------------------------------------
		5 - Back to top Button 
	----------------------------------------------------- */
	/* show / hide the button */
	var toTop = $('#to-top'),
		scrollTrig = 300, // 300px
		backTop = function() {
			var windScroll = $(window).scrollTop();
			if(windScroll >= scrollTrig) {
				toTop.addClass('show');
			} else {
				toTop.removeClass('show');
			}
		};
	backTop();
	$(window).on('scroll', function() {
		backTop();
	});
	/* Move to top after clicking on to-top button */
	toTop.on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/* ---------------------------------------------------
		6 - Parallax Effect
	----------------------------------------------------- */
	$('.jarallax').jarallax({
		speed: 0.5,
		noAndroid: true,
		noIos: true
	});

	/* ---------------------------------------------------
		7 - Skills bars with animation 
	----------------------------------------------------- */
	var skillWithAnim = $('.skill.has-animation'),
		bar = skillWithAnim.find('.progress-bar');
	if(bar.length) {
		bar.each(function() {
			$(this).appear(function() {
				$(this).css('width', function() {
					return $(this).attr('data-width');
				}).children('.percent').css('opacity', '1');
			});
		});
	}

	/* ---------------------------------------------------
		8 - Testimonial Carousel 
	----------------------------------------------------- */
	var testmonialCarousel = $('.test-carousel');
	if(testmonialCarousel.length) {
		testmonialCarousel.owlCarousel({
			loop: true,
			margin: 30,
			autoplay: true,
			nav: false,
			dots: true,
			dotsSpeed: 200,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 2
				}
			}
		});
	}	

	/* ---------------------------------------------------
		9 - Clients Carousel 
	----------------------------------------------------- */
	var clientsCarousel = $("#clients .owl-carousel");
	if(clientsCarousel.length) {
		clientsCarousel.owlCarousel({
			loop: true,
			responsiveClass: true,
			margin: 30,
			stagePadding:30,
			nav: false,
			dots: false,
			dotsEach: false,
			autoplay: true,
			autoplayTimeout: 1500,
			autoplayHoverPause: true,
			responsive: {
				0: { items: 1	},
				480: { items: 3 },
				768: { items: 4 },
				1000: { items: 6 }
			}
		});
	}

	/* ---------------------------------------------------
		10 - Count To Numbers 
	----------------------------------------------------- */
	var count = $('.count');
	if(count.length) {
		count.each(function() {
			$(this).appear(function() {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function() {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
		});
	}
	/* ---------------------------------------------------
		11 - Contact Form Validation 
	----------------------------------------------------- */
	// Variables
	var contactForm = $("#contact-form");
	if(contactForm.length) {
		var formResponse = contactForm.find(".form-response"),
			submitButton = contactForm.find('.submit-btn');
		contactForm.validator().on("submit", function(e) {
			if(e.isDefaultPrevented()) {
				formResponse.html("<i class='fa fa-times'></i> Sorry, you didn't fill the form.").fadeIn(1000);
			} else {
				e.preventDefault();
				submitForm();
			}
		});
		// Submit Function
		function submitForm() {
			// Some Variables
			var name = $("#name").val(),
				mail = $("#mail").val(),
				message = $("#message").val();
			$.ajax({
				type: "POST",
				url: "php/contact.php",
				data: "name=" + name + "&mail=" + mail + "&message=" + message,
				beforeSend: function(text) {
					submitButton.html("<i class='fa fa-spinner fa-spin'></i> Sending...");
					formResponse.fadeOut(500).text("");
				},
				success: function(text) {
					if(text === "success") {
						contactForm[0].reset();
						formResponse.html("<i class='fa fa-check'></i> Thanks! Your message sent correctly.").fadeIn(1000);
						submitButton.html("<i class='fa fa-paper-plane-o'></i> Send Message");
					} else {
						formResponse.text(text).fadeIn(1000);
					}
				}
			});
		}
	}	

	/* ---------------------------------------------------
		12 - Blog Comment Form Validation
	----------------------------------------------------- */
	var commentForm = $('#comment-form');
	if(commentForm.length) {
		commentForm.validator();
	}
}(jQuery));

/* ---------------------------------------------------
	13 - Google Map 
----------------------------------------------------- */
function initMap() {
	// Styles a map in night mode.
	var myLatLng = {lat: 40.710531, lng: -74.005160}; // Change to your latitude and longitude 
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		scrollwheel: false,
		zoom: 14,
		// Light Style
		//styles: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#333333"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers":[{"visibility": "on"},{"color": "#ffffff"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#fefefe"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#fefefe"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#f5f5f5"},{"lightness": 20}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#f5f5f5"},{"lightness": 21}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#dedede"},{"lightness": 21}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#cccccc"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#ffffff"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#e2e2e2"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#e3e3e3"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#f2f2f2"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#cccccc"},{"lightness": 17}]}]
		// Dark Style
		styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

	});
	// Adding Marker
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: "http://i.imgur.com/hOkuymb.png"
	});
}