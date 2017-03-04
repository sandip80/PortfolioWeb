(function () {
    var $ = require('jquery');
    $(window).on('load', function() {
        // Animate loader off screen
        setTimeout(function() {
            $(".se-pre-con").fadeOut("slow");
        }, 1000);
        $("html").niceScroll();
    });
})();
