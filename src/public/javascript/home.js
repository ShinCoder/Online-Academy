// $("#top-carousel").owlCarousel({
//     autoPlay: false,
//     slideSpeed:1000,
//     pagination:false,
//     navigation:true,
//     items : 3,
//     /* transitionStyle : "fade", */    /* [This code for animation ] */
//     navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
//     itemsDesktop : [1199,3],
//     itemsDesktopSmall : [980,3],
//     itemsTablet: [768,2],
//     itemsMobile : [479,1],
//     afterAction: function(el){
//     //remove class active
//     this.$owlItems.removeClass('active')
//     //add class active
//     this.$owlItems //owl internal $ object containing items
//     .eq(this.currentItem + 1).addClass('active')
//     }
//   });

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
  autoplay: false,
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
