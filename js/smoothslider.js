(function () {
    var $ = require('jquery');
    $(document).on('click', '.smooth', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 1000);
    });
})();
