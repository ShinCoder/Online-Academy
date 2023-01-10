// For Search Toggle
$('.search-toggler').on('click', function () {
  $('.search-area').fadeToggle(1000);
  $('input[name="key"]').focus();
});
$('.search-close').on('click', function () {
  $('.search-area').css('display', 'none');
});

// For Sticky Menu
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 50) {
    $('.header-bottom').addClass('stick');
  } else {
    $('.header-bottom').removeClass('stick');
  }
});
