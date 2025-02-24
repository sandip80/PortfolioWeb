(function () {
    var $ = require('jquery');
    $(window).on('load', function() {
        $('#goToTop').removeClass('active');
        checkGoToTopVisibility();
    });
    $(window).scroll(function() {
        var $el = $('.fixedElement');
        var isPositionFixed = ($el.css('position') == 'fixed');
        if ($(this).scrollTop() >= $el.offset().top && !isPositionFixed) {
            $('.fixedElement').css({'position': 'fixed', 'top': '0px'});
            $('#smoothdiv').css({'height': $el.height()
            + parseInt($el.css('margin-bottom'), 10) + 2 * parseInt($el.css('padding-bottom'), 10) + 'px'});
            $('#smoothdiv').show();
        }
        if ($(this).scrollTop() < $(this).height() && isPositionFixed) {
            $('.fixedElement').css({'position': 'static', 'top': '0px'});
            $('#smoothdiv').hide();
        }
        checkGoToTopVisibility();
    });
    var checkGoToTopVisibility = function() {
        if (window.scrollY >= window.innerHeight) {
            $('#goToTop').css({'opacity': '1'});
        } else {
            $('#goToTop').css({'opacity': '0'});
        }
    }
})();
