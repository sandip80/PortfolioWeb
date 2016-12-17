(function() {
    var raf = require('raf');

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('header-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width; x+=width / 100) {
            var c = new Circle('rgba('+  Math.floor(Math.random() * 255) +','+
              Math.floor(Math.random() * 255)+','+ Math.floor(Math.random() * 255) + ',' + 0.7 +')');
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        raf(animate);
    }

    // Canvas manipulation
    function Circle(color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            _this.color = color || null;
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = Math.random()*height;
            _this.alpha = 0.1+Math.random()*0.3;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocityX = Math.random() * - 1 + Math.random();
            _this.velocityY = Math.random() * - 1 + Math.random();
            _this.aflag = 1;
            _this.xflag = 1;
            _this.yflag = 1;
        }

        this.draw = function() {
            _this.pos.y += _this.velocityX * _this.yflag;
            _this.pos.x += _this.velocityY * _this.xflag;
            _this.alpha += 0.005 * _this.aflag;
            if (_this.velocityX == 0) {
                _this.velocityX = Math.random() * - 1 + Math.random();
            }
            if (_this.velocityY == 0) {
                _this.velocityY = Math.random() * - 1 + Math.random();
            }
            if (_this.pos.y >= height || _this.pos.y <= 0) {
                _this.yflag *= -1;
            }
            if (_this.pos.x >= width || _this.pos.x <= 0) {
                _this.xflag *= -1;
            }
            if (_this.alpha <= 0 || _this.alpha >= 0.3 + Math.random() * 0.3) {
                _this.aflag *= -1;
            }
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = _this.color.substring(0, _this.color.length - 4)+ _this.alpha+')';
            ctx.fill();
        };
    }

})();
