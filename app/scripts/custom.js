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
      header.className = header.className.replace("header-shrink", "").trim();
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

  jQuery.validator.addMethod("phoneno", function(value, element) {
    // allow any non-whitespace characters as the host part
    return this.optional( element ) || /^\(?[0-9]{3}(\-|\)) ?[0-9]{3}-[0-9]{4}$/.test( value );
  }, 'Please enter a valid phone number.');

  $("#contactForm").validate({
    debug: true,
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true,
        maxlength: 30
      },
      phone: {
        required: true,
        phoneno: true,
        maxlength: 20
      },

    },
    submitHandler: function() {
      console.log("Submit successful!!");
      alert("Thanks for submitting!!");
    }
  });

  function CounterAnimate(element) {
    //  'use strict';
    this.element = document.getElementById(element);
    this.elementEndingNumber = !isNaN(this.element.textContent) ? parseInt(this.element.textContent) : console.log('Lucky Number is NaN');
    this.elementCounter = 0;
    this.intervalId;

  }

  CounterAnimate.prototype.checkPos = function() {
    var windowOffset = window.pageYOffset;
    var windowHeight = window.innerHeight;
    //
    if (typeof this.element === "object") {
      var elementTop = this.element.getBoundingClientRect().top;
    } else {
      var elementTop = this.getBoundingClientRect().top;
    }

    if ((elementTop + windowOffset) <= windowOffset + (windowHeight * 0.75)) {
      return true;
    }

  }

  CounterAnimate.prototype.frame = function() {
    if (this.elementCounter > this.elementEndingNumber) {
      window.clearInterval(this.intervalId);
    } else {
      this.element.textContent = this.elementCounter++;
    }
  }

  CounterAnimate.prototype.play = function() {
    var self = this;
    if (this.checkPos()) {
      this.intervalId = window.setInterval(function() {
        self.frame();
      }, 700);
    }
  }



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

  $charts = $('.chart');
  $(window).on('scroll', function() {
    $charts.each(function() {
      if (CounterAnimate.prototype.checkPos.call(this)) {
        $(this).easyPieChart({
          animate: 2000,
          trackColor: '#e1e1e3',
          //scaleColor: '#e1e1e3',
          lineWidth: 15,
          easing: "easeOutBounce",
          barColor: '#2196F3',
          scaleLength: 0,
          size: 152,
          //rotate: 0,

          onStep: function(from, to, currentValue) {
            $(this.el).find('span').text(Math.round(currentValue) + '%');
          }

        });
      }
    });
  });


});
