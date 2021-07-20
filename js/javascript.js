//  $(document).bind("contextmenu", function (e) {
//    return false;
//  });


const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["Aniket", "Web Developer", "Java Developer"];
const typingDelay = 80;
const erasingDelay = 80;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;
function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}
function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}
document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Technical Skills On scroll Animation Fuction
$(document).ready(function ($) {
  $(window).scroll(function () {
    var hT = $('#skill-bar-wrapper').offset().top,
      hH = $('#skill-bar-wrapper').outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS > (hT + hH - 1.4 * wH)) {
      jQuery(document).ready(function () {
        jQuery('.tech_skillbar_container').each(function () {
          jQuery(this).find('.tech_skills').animate({
            width: jQuery(this).attr('data-percent')
          }, 3000); // 5 seconds
        });
      });
    }
  });
});
// Circular  Skills Bar Function
$(document).ready(function ($) {
  function animateElements() {
    $('.progressbar').each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find('.circle').attr('data-percent');
      var percentage = parseInt(percent, 10) / parseInt(100, 10);
      var animate = $(this).data('animate');
      if (elementPos < topOfWindow + $(window).height() - 100 && !animate) {
        $(this).data('animate', true,);
        $(this).find('.circle').circleProgress({
          startAngle: -Math.PI / 2,
          value: percent / 100,
          size: 180,
          thickness: 5,
          emptyFill: "rgba(255,255,255,.1)",
          fill: {
            color: '#ffffff'
          }
        }).on('circle-animation-progress', function (event, progress, stepValue) {
          $(this).find('div').text((stepValue * 100).toFixed(1) + "%");
        }).stop();
      }
    });
  }
  // Show animated elements
  animateElements();
  $(window).scroll(animateElements);
});
// -------------// Mobile Menu----------------
$(document).ready(function () {
  // menu click event
  $('.menuBtn').click(function () {
    $(this).toggleClass('act');
    if ($(this).hasClass('act')) {
      $('.mainMenu').addClass('act');
      $('body').addClass('stop-scrolling')
    }
    else {
      $('.mainMenu').removeClass('act');
      $('body').removeClass('stop-scrolling')
    }
  });
  $('a').click(function () {
    $('.mainMenu').removeClass('act');
    $('.menuBtn').removeClass('act');
    if ($('body').hasClass('stop-scrolling')) {
      $('body').removeClass('stop-scrolling')
    }
  });
});
// -----------------------Smooth Scrolling Script------------------
$(document).ready(function () {
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
    });
  });
});
