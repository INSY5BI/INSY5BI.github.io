var Game = function game() {
  var _this = this;
  this.stage = new createjs.Stage("game");

  this.points = 0;
  this.bullets = new createjs.Container();
  this.enemies = new createjs.Container();

  this.drawScore();

  this.canvasWidth = this.stage.canvas.width;
  this.canvasHeight = this.stage.canvas.height;

  this.controller = new createjs.Bitmap("../../app/assets/controller.png");
  this.controller.x = this.canvasWidth/2-32;
  this.controller.y = this.canvasHeight/2-32;
  this.controller.regX = 32;
  this.controller.regY = 32;
  this.stage.addChild(this.controller);

  this.stage.addChild(this.bullets);
  this.stage.addChild(this.enemies);
  // -->
  document.onkeydown = function(ev) {
    _this.handleKeys(ev);
  };

  createjs.Ticker.setInterval(25);
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener('tick', function() {
    _this.update();
  });

  setInterval(function(){
    _this.addEnemy();
  }, 3000);
};

Game.prototype.drawScore = function() {
  // Rechteck als Hintergrund
  var rect = new createjs.Graphics();
  rect.beginFill(createjs.Graphics.getRGB(100, 100, 100));
  rect.drawRect(0,0,100,40);
  var background = new createjs.Shape(rect);
  // Text den wir im Klassen scope verfügbar machen
  // um diesen später aktualisieren zu können
  this.score = new createjs.Text(this.points + " Punkte", "20px Arial", "#fff");
  this.score.x = 10;
  this.score.y = 10;
  this.stage.addChild(background);
  this.stage.addChild(this.score);
};

Game.prototype.handleKeys = function(ev) {
  var _this = this;
  console.log(ev.keyCode);
  switch(ev.keyCode) {
    case 37:
      if (_this.controller.rotation < 0) {
        _this.controller.rotation = 360;
      }
      _this.controller.rotation -= 10;
      break;
    case 39:
      if (_this.controller.rotation > 360) {
        _this.controller.rotation = 0;
      }
      _this.controller.rotation += 10;
      break;
    case 32:
      _this.shoot();
      break;
  }
};

Game.prototype.shoot = function() {
  var bullet = new createjs.Bitmap("../../app/assets/bullet.png");
  bullet.x = this.stage.canvas.width/2-32;
  bullet.y = this.stage.canvas.height/2-32;
  bullet.regX = 32;
  bullet.regY = 32;
  bullet.rotation = this.controller.rotation;
  this.bullets.addChild(bullet);
};

Game.prototype.addEnemy = function() {
  var enemy = new createjs.Bitmap("../../app/assets/enemy.png");
  enemy.x = Math.floor(Math.random() * (this.stage.canvas.width - 100)) ;
  enemy.y = Math.floor(Math.random() * (this.stage.canvas.height - 100));
  enemy.rotation = Math.floor(Math.random()*360);
  this.enemies.addChild(enemy);
};

Game.prototype.update = function() {
  var _this = this;
  // Shoot
  for(var i = 0; i < _this.bullets.children.length; i++)
   {
       _this.bullets.children[i].x = 10 * Math.cos((_this.bullets.children[i].rotation-90)/(Math.PI/4)) + _this.bullets.children[i].x;
       _this.bullets.children[i].y = 10 * Math.sin((_this.bullets.children[i].rotation-90)/(Math.PI/4)) + _this.bullets.children[i].y;

       // Out of stage
       if(_this.bullets.children[i].y < -2 || _this.bullets.children[i].y > _this.canvasHeight ||
         _this.bullets.children[i].x < -2 || _this.bullets.children[i].x > _this.canvasWidth )
        {
            _this.bullets.removeChildAt(i);
        }

       // Hittest
       for(var j = 0; j < _this.enemies.children.length; j++) {
         if (_this.bullets.children[i]) {
         var pt = _this.bullets.children[i].localToLocal(0,0, _this.enemies.children[j]);
         if (_this.enemies.children[j].hitTest(pt.x, pt.y)) {
              _this.points++;
              _this.score.text = _this.points + " Punkte";
              _this.enemies.removeChildAt(j);
              _this.bullets.removeChildAt(i);
           }
         }
       }

   }
   for(var j = 0; j < _this.enemies.children.length; j++) {
     _this.enemies.children[j].x = 2 * Math.cos((_this.enemies.children[j].rotation-90)/(Math.PI/4)) + _this.enemies.children[j].x;
     _this.enemies.children[j].y = 2 * Math.sin((_this.enemies.children[j].rotation-90)/(Math.PI/4)) + _this.enemies.children[j].y;

     // Out of stage
     if(_this.enemies.children[j].y < -2 || _this.enemies.children[j].y > _this.canvasHeight ||
       _this.enemies.children[j].x < -2 || _this.enemies.children[j].x > _this.canvasWidth )
      {
          _this.enemies.removeChildAt(i);
      }
   }
   _this.stage.update();
};
