$(document).ready(function() {
  $('#containerText').typed({
    strings: ['Computer Scientist.', 'Web Developer.', 'Dublin.'],
    typeSpeed: 25,
    backSpeed: 0,
    startDelay: 1000,
    loop: true,
    showCursor: false
  });
  return $('#footerText').hover((function() {
    $(this).closest('.footer').addClass('footerHover');
    return $(this).closest('#footerText').addClass('footerTextHover');
  }), function() {
    $(this).closest('.footer').removeClass('footerHover');
    return $(this).closest('#footerText').removeClass('footerTextHover');
  });
});
