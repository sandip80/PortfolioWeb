(function () {
    var $ = require('jquery');
    $(window).scroll(function() {
        var $el = $('.fixedElement');
        var isPositionFixed = ($el.css('position') == 'fixed');
        if ($(this).scrollTop() >= $el.offset().top && !isPositionFixed) {
            $('.fixedElement').css({'position': 'fixed', 'top': '0px'});
            $('#smoothdiv').css({'height': $el.height()
            + parseInt($el.css('margin-bottom'), 10) + 2 * parseInt($el.css('padding-bottom'), 10) + 'px'});
            $('#smoothdiv').show();
            $('#goToTop').css({'margin-left': '0px'});
            $('#goToTop').removeClass('fadeOut');
            $('#goToTop').addClass('fadeIn');
        }
        if ($(this).scrollTop() < $(this).height() && isPositionFixed) {
            $('.fixedElement').css({'position': 'static', 'top': '0px'});
            $('#smoothdiv').hide();
            $('#goToTop').css({'margin-left': '15px'});
            $('#goToTop').removeClass('fadeIn');
            $('#goToTop').addClass('fadeOut');
        }
    });
})();
