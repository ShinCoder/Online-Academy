$('.owl-carousel').owlCarousel({
  // stagePadding: 200,
  loop: true,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>"
  ],
  items: 1,
  center: true,
  lazyLoad: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: false,
  responsive: {
    0: {
      items: 1
      // stagePadding: 60
    },
    768: {
      items: 3
      // stagePadding: 100
    }
  }
});
