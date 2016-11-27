$(document).ready(function() {

	$.getJSON("./images.json", function(data) {
		var images = data.images;
		console.log(images.length);
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
});