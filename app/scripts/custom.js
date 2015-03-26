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
                header.className = header.className + " header-shrink";
            }
        }
        else
        {
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
