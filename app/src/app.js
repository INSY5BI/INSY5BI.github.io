var Game = function game() {
  var _this = this;
  this.stage = new createjs.Stage("game");

  this.points = 0;
  this.bullets = new createjs.Container();

  var text = new createjs.Text(this.points + " Punkte", "20px Arial", "#fff");
  text.x = 10;
  text.y = 10;
  this.stage.addChild(text);

  this.canvasWidth = this.stage.canvas.width;
  this.canvasHeight = this.stage.canvas.height;

  this.controller = new createjs.Bitmap("assets/controller.png");
  this.controller.x = this.canvasWidth/2-32;
  this.controller.y = this.canvasHeight/2-32;
  this.controller.regX = 32;
  this.controller.regY = 32;
  this.stage.addChild(this.controller);

  this.stage.addChild(this.bullets);
  // -->
  document.onkeydown = function(ev) {
    _this.handleKeys(ev);
  };

  createjs.Ticker.setInterval(25);
  createjs.Ticker.setFPS(40);
  createjs.Ticker.addEventListener('tick', function() {
    _this.update();
  });
};

Game.prototype.handleKeys = function(ev) {
  var _this = this;
  console.log(ev.keyCode);
  switch(ev.keyCode) {
    case 37:
      _this.controller.rotation -= 20;
      break;
    case 39:
      _this.controller.rotation += 20;
      break;
    case 32:
      _this.shoot();
      break;
  }
};

Game.prototype.shoot = function() {
  var bullet = new createjs.Bitmap("assets/bullet.png");
  bullet.x = this.stage.canvas.width/2-32;
  bullet.y = this.stage.canvas.height/2-32;
  bullet.regX = 32;
  bullet.regY = 32;
  bullet.rotation = this.controller.rotation;
  this.bullets.addChild(bullet);
};

Game.prototype.update = function() {
  var _this = this;
  console.log(_this.bullets.children);
  // Shoot
  for(var i = 0; i < _this.bullets.children.length; i++)
   {
       _this.bullets.children[i].x = 10 * Math.cos((_this.bullets.children[i].rotation-90)/(Math.PI/4)) + _this.bullets.children[i].x;
       _this.bullets.children[i].y = 10 * Math.sin((_this.bullets.children[i].rotation-90)/(Math.PI/4)) + _this.bullets.children[i].y;
       console.log(_this.bullets.children[i].y, _this.bullets.children[i].x);
       if(_this.bullets.children[i].y < -2 || _this.bullets.children[i].y > this.canvasHeight ||
         _this.bullets.children[i].x < -2 || _this.bullets.children[i].x > this.canvasWidth )
        {
            _this.bullets.removeChildAt(i);
        }
   }
   _this.stage.update();
};

window.onload = function() {
  // Spiel Starten
  new Game();
};
