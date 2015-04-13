console.log("hello");
/ * Fix autofocus in Bootstrap modal */
$('#myModal').on('shown.bs.modal', function() {
  $('#myInput').focus()
})


﻿
var animateHeader = (function() {

  var docElem = document.documentElement,
    header = document.querySelector('.navbar-fixed-top'),
    didScroll = false,
    changeHeaderOn = 300;

  function init() {
    window.addEventListener('scroll', function(event) {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 250);
      }

    }, false);
  }

  function scrollPage() {
    var sy = scrollY();
    if (sy >= changeHeaderOn) {
      if (header.className.search("header-shrink") == -1) {
        header.className = header.className + " header-shrink";
      }
    } else {
      // Todo: remove console.log after testing
      console.log(header.className);
      header.className = header.className.replace("header-shrink", "");
    }
    didScroll = false;

  }

  function scrollY() {
    // docElem.scrollTop for IE8 and below
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  init();

})();

jQuery(document).ready(function($) {

  // http://codyhouse.co/gem/vertical-timeline/ Guideline for building timeline
  var $timeline_block = $('.job-timeline-block');

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function() {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.resume-timeline-date, .resume-content').addClass('is-hidden');
    }
  });


  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function() {

    $timeline_block.each(function() {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.resume-timeline-date').hasClass('is-hidden')) {
        $(this).find('.resume-timeline-date, .resume-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });

});


function CounterAnimate()
{
  //  'use strict';
    this.coffee = document.getElementById('coffeeCupNumber');
    this.coffeeCups = !isNaN(this.coffee.textContent) ? parseInt(this.coffee.textContent) : console.log('Lucky Number is NaN');
    this.coffeeCupsInitial = 0;
    this.timerId;
    var that = this;
}

CounterAnimate.prototype.checkPos = function()
{
  var windowOffset = window.pageYOffset;
  var windowHeight = window.innerHeight;
  var coffeeTop = this.coffee.getBoundingClientRect().top;

  if ((coffeeTop + windowOffset) <= windowOffset + (windowHeight * 0.75)) {
    console.log("Coffee top: " + coffeeTop + "\n Window Height: " + windowHeight + "\n Window offset: " + windowOffset);
  }

}

CounterAnimate.prototype.frame = function()
{
  if (this.coffeeCupsInitial > this.coffeeCups) {
    window.clearInterval(this.timerId);
  } else {
    this.coffee.textContent = this.coffeeCupsInitial++;
  }
}

CounterAnimate.prototype.play = function()
{
  var self = this;
  this.timerId = window.setInterval(function(){ self.frame(); }, 500);
}

window.onload = function() {
  /* Animation of numbers for counter section */
  var luckyNumberEl = document.getElementById('luckyNumber');
  var luckyNumber = !isNaN(luckyNumberEl.textContent) ? parseInt(luckyNumberEl.textContent) : console.log('Lucky Number is NaN');
  var luckyNumberCount = 0;


  function play() {

      function frame() {

          if (luckyNumberCount > luckyNumber) {
            window.clearInterval(timerId);
          } else {
            luckyNumberEl.textContent = luckyNumberCount++;
          }
      }

    var timerId = window.setInterval(frame, 500);
  }


  var luckyNumberOffsetY = 0;
  var windowY = 0;
  var luckyNumberElY = 0;
  var windowHeight = 0;

  var Counter = new CounterAnimate();

  var runCounter = function() {
    luckyNumberOffsetY = luckyNumberEl.getBoundingClientRect().top;
    windowY = window.pageYOffset;
    luckyNumberElY = luckyNumberEl.getBoundingClientRect().top + windowY;
    windowHeight = window.innerHeight;

    Counter.play();

    console.log(
      "Window Height + windowY : " + (windowY + (window.innerHeight * 0.75)) + " \nluckyNumberElY " + luckyNumberElY);
    if (luckyNumberElY <= windowY + (window.innerHeight * 0.75)) {
      play();
    }

  }
  window.onscroll = runCounter;

}
