var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;

var count = 0;
var score = document.getElementById('score');
var random = t=>Math.random()*t;
var squares = [];
var Square = function(){
	this.x = this.y = this.hue = this.speed = null;
	this.reset();
} 

parameters = {
	minSpeed: 0.5,
	addSpeed: 2.5,
	size: 20,
	amount: 20
},

	Square.prototype.reset = function(){
		this.x = random(w);
		this.y = -parameters.size;
		this.hue = random(360);
		this.speed = random(parameters.addSpeed) + 1;
	}

	Square.prototype.update = function(){
		this.y > h ? (this.reset()) : this.y += this.speed;
	}

	Square.prototype.render = function(){
		ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
		ctx.fillRect(this.x, this.y, parameters.size, parameters.size);
	}

	function setup(){
		squares = new Array(parameters.amount).fill().map(
			function(el, ind){
				return new Square();
			})
		loop();
	}

	function loop(){
		ctx.clearRect(0,0,w,h);
		squares.forEach(function (el){
			el.update();
			el.render();
		})
		score.textContent = +count;
		requestAnimationFrame(loop);
	}

	function click(e){
		e.preventDefault();
		let x = e.clientX - 10,
			y = e.clientY - 25;
		squares.forEach(function(el, ind, arr){
			if( x > el.x &&
				x < el.x + parameters.size &&
				y > el.y &&
				y < el.y + parameters.size){
		count++
		let index = arr.indexOf(el);
		arr.splice(index, 1);
		squares.push(new Square());
			}
		})	
	}

	setup();
	window.addEventListener('mousedown', click);

	function stop(){
		squares = [];
		count = null;
	}

	function start(){
		location.reload();
	}



































