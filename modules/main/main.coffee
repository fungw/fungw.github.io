$(document).ready ->
	$('#containerText').typed
		strings: [
			'Computer Scientist.'
			'Web Developer.'
			'Dublin.'
		]
		typeSpeed: 25
		backSpeed: 0
		startDelay: 1000
		loop: true
		showCursor: false
		
	$('#footerText').hover (->
		$(this).closest('.footer').addClass 'footerHover'
		$(this).closest('#footerText').addClass 'footerTextHover'
	), ->
		$(this).closest('.footer').removeClass 'footerHover'
		$(this).closest('#footerText').removeClass 'footerTextHover'