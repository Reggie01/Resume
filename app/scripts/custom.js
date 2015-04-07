console.log("hello");
/ * Fix autofocus in Bootstrap modal */
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})


﻿var animateHeader = (function() {

    var docElem = document.documentElement,
    header = document.querySelector( '.navbar-fixed-top'),
    didScroll = false,
    changeHeaderOn = 300;

    function init() {
         window.addEventListener( 'scroll', function( event ){

          if (!didScroll ) {
              didScroll = true;
              setTimeout ( scrollPage, 250 );
          }

         }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            if(header.className.search("header-shrink") == -1){
                header.className = header.className + "header-shrink";
            }
        }
        else
        {
            // Todo: remove console.log after testing
            console.log(header.className);
            header.className = header.className.replace("header-shrink", "");
        }
        didScroll = false;

    }

    function scrollY() {
         // docElem.scrollTop for IE8 and below
         return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();

// http://codyhouse.co/gem/vertical-timeline/ Guideline for building timeline

jQuery(document).ready(function($){
  var $timeline_block = $('.job-timeline-block');

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function(){
    if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
      $(this).find('.resume-timeline-date, .resume-content').addClass('is-hidden');
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    $timeline_block.each(function(){
      if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.resume-timeline-date').hasClass('is-hidden') ) {
        $(this).find('.resume-timeline-date, .resume-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
});
