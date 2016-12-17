(function() {
    var $ = require('jquery');
    var raf = require('raf');

	var width, height, canvas, image, ctx, animatethis = true;

	// main
	initCanvas();
	addListeners();

	function initCanvas() {
		width = window.innerWidth - 10;
		height = 200;
		
		canvas = document.getElementById('slideshow');
		canvas.width = width;
		canvas.height = height;

		image = new Image();
		image.src = "img/hob.jpg";

		ctx = canvas.getContext('2d');
		
		image.onload = function() {
			ctx.drawImage(image, 0, 0);
			animate();
		}
	}

	function addListeners() {
        window.addEventListener('resize', resize);
    }

    function resize() {
    	if (currentX2 == width) {
    		currentX2 = window.innerWidth;
    	}
        width = window.innerWidth;
        canvas.width = width;
    }

    function animate() {
    	if (animatethis) {
    		ctx.clearRect(0,0,width,height);
    		draw();
    	}
    	requestAnimationFrame(animate);
    }

    var currentX1 = 0;
    var currentX2 = window.innerWidth - 10;

    function draw() {
    	ctx.beginPath();
		ctx.drawImage(image, currentX1, 0);
    	ctx.closePath();
    	currentX1 -= 1;
    	if (currentX1 <= width - image.width) {
    		ctx.beginPath();
    		ctx.drawImage(image, currentX2, 0);
    		ctx.closePath();
    		currentX2 -= 1;
    	}
    	if (currentX2 == 0) {
    		currentX1 = 0;
    		currentX2 = width;
    	}
    }

})();