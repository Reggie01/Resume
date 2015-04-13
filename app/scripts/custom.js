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


// Todo: remove hardcoded values
function CounterAnimate(element)
{
  //  'use strict';
    this.element = document.getElementById(element);
    this.elementEndingNumber = !isNaN(this.element.textContent) ? parseInt(this.element.textContent) : console.log('Lucky Number is NaN');
    this.elementCounter = 0;
    this.intervalId;

}

CounterAnimate.prototype.checkPos = function()
{
  var windowOffset = window.pageYOffset;
  var windowHeight = window.innerHeight;
  var elementTop = this.element.getBoundingClientRect().top;

  if ((elementTop + windowOffset) <= windowOffset + (windowHeight * 0.75)) {
    console.log("Element top: " + elementTop + "\n Window Height: " + windowHeight + "\n Window offset: " + windowOffset);
    return true;
  }

}

CounterAnimate.prototype.frame = function()
{
  if (this.elementCounter > this.elementEndingNumber) {
    window.clearInterval(this.intervalId);
  } else {
    this.element.textContent = this.elementCounter++;
  }
}

CounterAnimate.prototype.play = function()
{
  var self = this;
      if(this.checkPos()){
        this.intervalId = window.setInterval(function(){ self.frame(); }, 500);
      }
  }

window.onload = function() {
  /* Animation of numbers for counter section */

  var musicNumberAnimation = new CounterAnimate('musicNumber');
  var coffeeNumberAnimation = new CounterAnimate('coffeeCupNumber');
  var luckyNumberAnimation = new CounterAnimate('luckyNumber');


  var numberAnimation = function() {
      console.log('scrolling...');
      coffeeNumberAnimation.play();
      musicNumberAnimation.play();
      luckyNumberAnimation.play();
  }

  window.onscroll = numberAnimation;
}
