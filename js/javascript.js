$(document).bind("contextmenu", function (e) {
  return false;
});
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
// ^^^^^^^^^^^^^^^^^^^^^^^^circular skill bar cdn^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
!(function (i) {
  if ("function" == typeof define && define.amd) define(["jquery"], i);
  else if ("object" == typeof module && module.exports) {
    var t = require("jquery");
    i(t), (module.exports = t);
  } else i(jQuery);
})(function (i) {
  function t(i) {
    this.init(i);
  }
  (t.prototype = {
    value: 0,
    size: 100,
    startAngle: -Math.PI,
    thickness: "auto",
    fill: { gradient: ["#3aeabb", "#fdd250"] },
    emptyFill: "rgba(0, 0, 0, .1)",
    animation: { duration: 3000, easing: "circleProgressEasing" },
    animationStartValue: 0,
    reverse: !1,
    lineCap: "butt",
    insertMode: "prepend",
    constructor: t,
    el: null,
    canvas: null,
    ctx: null,
    radius: 0,
    arcFill: null,
    lastFrameValue: 0,
    init: function (t) {
      i.extend(this, t),
        (this.radius = this.size / 2),
        this.initWidget(),
        this.initFill(),
        this.draw(),
        this.el.trigger("circle-inited");
    },
    initWidget: function () {
      this.canvas ||
        (this.canvas = i("<canvas>")[
          "prepend" == this.insertMode ? "prependTo" : "appendTo"
        ](this.el)[0]);
      var t = this.canvas;
      if (
        ((t.width = this.size),
          (t.height = this.size),
          (this.ctx = t.getContext("2d")),
          window.devicePixelRatio > 1)
      ) {
        var e = window.devicePixelRatio;
        (t.style.width = t.style.height = this.size + "px"),
          (t.width = t.height = this.size * e),
          this.ctx.scale(e, e);
      }
    },
    initFill: function () {
      function t() {
        var t = i("<canvas>")[0];
        (t.width = e.size),
          (t.height = e.size),
          t.getContext("2d").drawImage(g, 0, 0, r, r),
          (e.arcFill = e.ctx.createPattern(t, "no-repeat")),
          e.drawFrame(e.lastFrameValue);
      }
      var e = this,
        a = this.fill,
        n = this.ctx,
        r = this.size;
      if (!a) throw Error("The fill is not specified!");
      if (
        ("string" == typeof a && (a = { color: a }),
          a.color && (this.arcFill = a.color),
          a.gradient)
      ) {
        var s = a.gradient;
        if (1 == s.length) this.arcFill = s[0];
        else if (s.length > 1) {
          for (
            var l = a.gradientAngle || 0,
            o = a.gradientDirection || [
              (r / 2) * (1 - Math.cos(l)),
              (r / 2) * (1 + Math.sin(l)),
              (r / 2) * (1 + Math.cos(l)),
              (r / 2) * (1 - Math.sin(l))
            ],
            h = n.createLinearGradient.apply(n, o),
            c = 0;
            c < s.length;
            c++
          ) {
            var d = s[c],
              u = c / (s.length - 1);
            i.isArray(d) && ((u = d[1]), (d = d[0])), h.addColorStop(u, d);
          }
          this.arcFill = h;
        }
      }
      if (a.image) {
        var g;
        a.image instanceof Image
          ? (g = a.image)
          : ((g = new Image()), (g.src = a.image)),
          g.complete ? t() : (g.onload = t);
      }
    },
    draw: function () {
      this.animation
        ? this.drawAnimated(this.value)
        : this.drawFrame(this.value);
    },
    drawFrame: function (i) {
      (this.lastFrameValue = i),
        this.ctx.clearRect(0, 0, this.size, this.size),
        this.drawEmptyArc(i),
        this.drawArc(i);
    },
    drawArc: function (i) {
      if (0 !== i) {
        var t = this.ctx,
          e = this.radius,
          a = this.getThickness(),
          n = this.startAngle;
        t.save(),
          t.beginPath(),
          this.reverse
            ? t.arc(e, e, e - a / 2, n - 2 * Math.PI * i, n)
            : t.arc(e, e, e - a / 2, n, n + 2 * Math.PI * i),
          (t.lineWidth = a),
          (t.lineCap = this.lineCap),
          (t.strokeStyle = this.arcFill),
          t.stroke(),
          t.restore();
      }
    },
    drawEmptyArc: function (i) {
      var t = this.ctx,
        e = this.radius,
        a = this.getThickness(),
        n = this.startAngle;
      i < 1 &&
        (t.save(),
          t.beginPath(),
          i <= 0
            ? t.arc(e, e, e - a / 2, 0, 2 * Math.PI)
            : this.reverse
              ? t.arc(e, e, e - a / 2, n, n - 2 * Math.PI * i)
              : t.arc(e, e, e - a / 2, n + 2 * Math.PI * i, n),
          (t.lineWidth = a),
          (t.strokeStyle = this.emptyFill),
          t.stroke(),
          t.restore());
    },
    drawAnimated: function (t) {
      var e = this,
        a = this.el,
        n = i(this.canvas);
      n.stop(!0, !1),
        a.trigger("circle-animation-start"),
        n
          .css({ animationProgress: 0 })
          .animate(
            { animationProgress: 1 },
            i.extend({}, this.animation, {
              step: function (i) {
                var n = e.animationStartValue * (1 - i) + t * i;
                e.drawFrame(n), a.trigger("circle-animation-progress", [i, n]);
              }
            })
          )
          .promise()
          .always(function () {
            a.trigger("circle-animation-end");
          });
    },
    getThickness: function () {
      return i.isNumeric(this.thickness) ? this.thickness : this.size / 14;
    },
    getValue: function () {
      return this.value;
    },
    setValue: function (i) {
      this.animation && (this.animationStartValue = this.lastFrameValue),
        (this.value = i),
        this.draw();
    }
  }),
    (i.circleProgress = { defaults: t.prototype }),
    (i.easing.circleProgressEasing = function (i) {
      return i < 0.5
        ? ((i = 2 * i), 0.5 * i * i * i)
        : ((i = 2 - 2 * i), 1 - 0.5 * i * i * i);
    }),
    (i.fn.circleProgress = function (e, a) {
      var n = "circle-progress",
        r = this.data(n);
      if ("widget" == e) {
        if (!r)
          throw Error(
            'Calling "widget" method on not initialized instance is forbidden'
          );
        return r.canvas;
      }
      if ("value" == e) {
        if (!r)
          throw Error(
            'Calling "value" method on not initialized instance is forbidden'
          );
        if ("undefined" == typeof a) return r.getValue();
        var s = arguments[1];
        return this.each(function () {
          i(this).data(n).setValue(s);
        });
      }
      return this.each(function () {
        var a = i(this),
          r = a.data(n),
          s = i.isPlainObject(e) ? e : {};
        if (r) r.init(s);
        else {
          var l = i.extend({}, a.data());
          "string" == typeof l.fill && (l.fill = JSON.parse(l.fill)),
            "string" == typeof l.animation &&
            (l.animation = JSON.parse(l.animation)),
            (s = i.extend(l, s)),
            (s.el = a),
            (r = new t(s)),
            a.data(n, r);
        }
      });
    });
});
// ^^^^^^^^^^^^^^^^^^^^^^^Circular Skills bar CDN^^^^^^^^^^^^^^^^^^^^^^^^^^
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
