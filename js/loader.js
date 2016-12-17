var $ = require('jquery');
$(window).load(function() {
	// Animate loader off screen
	setTimeout(function() {
		$(".se-pre-con").fadeOut("slow");
	}, 1000);
});