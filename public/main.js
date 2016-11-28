$(document).ready(function() {

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

			$('<div class="row entry" id="'+id+'">'+
					'<div class="col-xs-3">'+
						'<div class="col-xs-12 title-heading sidebar">'+
							''+name+''+
						'</div>'+ 
						'<div class="col-xs-6 title-smallText sidebar">'+
							''+time+''+
						'</div>'+
					'</div>'+
					'<div class="col-xs-9 entry-content centered">'+
						'<a href='+google_maps+' target="_blank">'+
							'<img src="./images/'+filename+'" class="entry-image-portrait" height="'+height+'" width="'+width+'">'+
						'</a>'+
					'</div>'+
				'</div>').appendTo("#initial-view");

			$('<li id="'+id+'-button"><a href="#" class="nav-text">'+name+'</a></li>').appendTo("#nav-links");
		}
		$('li').bind("click", function(){
	    var id = ($(this).attr('id'));
			id = id.replace("-button", "");
			$('html,body').animate({
				scrollTop: $("#"+id).offset().top
			}, 1000);
		});
	});

	$(function(){
		$("#personal_name").typed({
			strings: ["Wesley Fung."],
			typeSpeed: 0,
			showCursor: false
		});

		$("#personal_details").typed({
			strings: ["Computer Scientist", "Web Developer", "Dublin"],
			typeSpeed: 25,
			backSpeed: 0,
			startDelay: 1000,
			loop: true,
			showCursor: false
		});
	})

	$(window).scroll(function(){
      $("#external_links").css("opacity", 1 - $(window).scrollTop() / ($('#external_links').height() / 2));
      $("#typed").css("opacity", 1 - $(window).scrollTop() / ($('#typed').height() / 2));
      $("#initial-sidebar").css("opacity", 1 - $(window).scrollTop() / ($('#initial-sidebar').height() / 2));
  });
});