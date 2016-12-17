(function () {
    var $ = require('jquery');
    function isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    function onVisibilityChange(el, callback) {
        var old_visible;
        return function () {
            var visible = isElementInViewport(el);
            if (visible != old_visible) {
                old_visible = visible;
                if (typeof callback == 'function') {
                    callback();
                }
            }
        }
    }

    var el = $('.main-title')[0];

    var handler = onVisibilityChange(el, function() {
        $('.main-title').addClass('animated fadeInDown');
        $('.slider').addClass('animated fadeInDown');
        $('.main-btns').addClass('animated bounceIn');
    });

    $(window).on('DOMContentLoaded load resize scroll', handler);

    $(window).scroll(function(){
        $(".main-title").css({"margin-top": ($(this).scrollTop() / 1.5) + "px", "color": 'rgba(255, 255, 255, ' + (1 + $(this).scrollTop() * -0.0015) + ')'});
        $(".main-btns").css({"margin-top": ($(this).scrollTop() / 1.5) + "px"});
        $(".main-btns li").css({"opacity": (1 + $(this).scrollTop() * -0.0015)});
        if ($(".main-btns li").css("opacity") <= 0.65) {
            $(".main-btns").removeClass('bounceIn');
            $(".main-btns").addClass('bounceOut');
        } else {
            $(".main-btns").removeClass('bounceOut');
            $(".main-btns").addClass('bounceIn');
        }
        if ($(window).scrollTop() - $(".slider").scrollTop() != 0) {
            $('.slider').removeClass('fadeInDown');
            $(".slider").addClass('fadeOutUp');
        } else {
            $(".slider").removeClass('fadeOutUp');
            $('.slider').addClass('fadeInDown');
        }
    });
})();
