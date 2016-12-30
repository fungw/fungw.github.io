$(window).on('load', function (e) {
	$.getJSON("./images.json", function(data) {
		var images = data.images;
		for (i = 0; i < images.length; i++) {
			var id = images[i].id;
			var filename = images[i].filename;
			var name = images[i].name;
			var time = images[i].time;
			var height = images[i].height;
			var width = images[i].width;
			var google_maps = images[i].google_maps;

			$('<div class="row entry_posts" id="'+id+'">'+
					'<div class="col-lg-3">'+
						'<div class="col-lg-12 title-heading sidebar">'+
							''+name+''+
						'</div>'+ 
						'<div class="col-lg-6 title-smallText sidebar">'+
							''+time+''+
						'</div>'+
					'</div>'+
					'<div class="col-xs-12 col-lg-9 entry-content centered">'+
						'<a href='+google_maps+' target="_blank">'+
							'<img src="./images/'+filename+'" class="entry-image-portrait" height="'+height+'" width="'+width+'">'+
						'</a>'+
					'</div>'+
				'</div>').appendTo("#initial-view");

			$('<li id="'+id+'-button" class="nav-items"><a href="#" class="nav-text">'+name+'</a></li>').appendTo("#nav-links");
		}
		$('li').bind("click", function(){
	    var id = ($(this).attr('id'));
			id = id.replace("-button", "");
			$('html,body').animate({
				scrollTop: $("#"+id).offset().top
			}, 1000);
		});

	  function generateRipple() {
	  	const circle1 = new mojs.Shape({
				fill:           'none',
			  radius:         25,
			  strokeWidth:    { 50 : 0 },
			  scale:          { 0: 1 },
			  angle:          { 'rand(-35, -70)': 0 },
			  duration:       500,
			  left: 0,        top: 0,
			  easing: 'cubic.out',
			  stroke:         'yellow',
			});
			const circle2 = new mojs.Shape({
				fill:           'none',
			  radius:         25,
			  strokeWidth:    { 50 : 0 },
			  scale:          { 0: 1 },
			  angle:          { 'rand(-35, -70)': 0 },
			  duration:       500,
			  left: 0,        top: 0,
			  easing: 'cubic.out',
			  radius:         { 0 : 15 },
			  strokeWidth:    { 30: 0 },
			  stroke:         'red',
			  delay:          'rand(75, 150)'
			});
			document.addEventListener( 'click', function (e) {
			   circle1
			    .tune({ x: e.pageX, y: e.pageY  })
			    .replay();
			  
			  circle2
			    .tune({ x: e.pageX, y: e.pageY  })
			    .replay();
			});
  	};

  	generateRipple();
	});
});

var alternating = 0;

$(document).ready(function() {
	$(function(){
		$("#personal_name").typed({
			strings: ["Wesley Fung."],
			typeSpeed: 0,
			showCursor: false
		});

		$("#personal_details").typed({
			strings: ["Computer Scientist.", "Web Developer.", "Dublin."],
			typeSpeed: 25,
			backSpeed: 0,
			startDelay: 1000,
			loop: true,
			showCursor: false
		});
	})

	$(window).scroll(function(){
      $("#external_links").css("opacity", 1 - $(window).scrollTop() / ($('#personal_image').height() * 3));
      $("#typed").css("opacity", 1 - $(window).scrollTop() / ($('#external_links').height() * 3));
      $("#personal_image").css("opacity", 1 - $(window).scrollTop() / ($('#external_links').height() * 3));
      $("#nav-links").css("opacity", 1 - $(window).scrollTop() / ($('#external_links').height() * 3));
      $("#personal_date").css("opacity", 1 - $(window).scrollTop() / ($('#external_links').height() * 3));
      $("#sign").css("opacity", 1 - $(window).scrollTop() / ($('#external_links').height() * 3));
  });

 	$(window).resize(function() {
  		fluidity();
	});

	function fluidity() {
		if ($(window).width() < 1000) {
			$("#typed_links").css("display", "none");
			$(".entry-content").css("height", "0%");
			$(".sign").css("display", "none");
		} else {
			$("#typed_links").css("display", "initial");
			$(".entry-content").css("height", "100%");
			$(".sign").css("display", "initial");
		}
	}
	fluidity();

	// window.setInterval(function(){
	//   alternateColors();
	// }, 1000);

	function alternateColors() {
 		if (alternating == 0) {
     		$(".entry-content").css("border-left", "10px solid #ADFF9E");
     		alternating = 1;
 		} else {
 			$(".entry-content").css("border-left", "10px solid #ff6a5c");
 			alternating = 0;
 		}
	}
});