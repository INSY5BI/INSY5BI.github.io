var Game = function game() {
  this.stage = new createjs.Stage("game");

  this.points = 0;

  var text = new createjs.Text(this.points + " Punkte", "20px Arial", "#fff");
  text.x = 10;
  text.y = 10;
  this.stage.addChild(text);

  this.stage.update();
};

window.onload = function() {
  // Spiel Starten
  new Game();
};
