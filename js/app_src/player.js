// Player 'extends' the Sprite class but adds
// methods to handle input and collisions with
// enemies.

var Player = function(options) {
  "use strict";
  
  var player_options = {
    sprite: playerImg,
    dWidth: 70,
    dHeight: 80,
    dx: 218,
    dy: 468,
    sx: 15,
    sy: 63,
    sHeight: 90,
    sWidth: 70
  };

  Sprite.call(this, player_options);
  // ddx and ddy are the amounts to move the player
  // on each step
  this.ddx = 0;
  this.ddy = 0;

  // All other Sprites
  this.otherSprites = options.otherSprites || [];

  // Player goal:
  this.GOAL = 73;
};

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.dx += this.ddx;
  this.dy += this.ddy;
  //this.render();
  this.checkCollsions();
  this.checkForWin();
  this.ddx = 0;
  this.ddy = 0;
};

Player.prototype.handleInput = function(key) {
  // Check the bounds, don't allow character to go out of screen
  if(key === 'left'){
    // x-min = 0
    if( this.dx > 0 ){
      this.ddx = -101;
    }
  } else if (key === 'up') {
    if( this.dy > -10 ){
      // y-max = -10
      this.ddy = -83;
    }
  } else if (key === 'down') {
    if( this.dy < 405 ){
      // y-min = 405
      this.ddy = 83;
    }
  } else if (key === 'right') {
    if( this.dx < 404 ){
      // x-max = 404
      this.ddx = 101;
    }
  } else if (key === 'space') {
    currentState = 'pause';
  }
};

Player.prototype.checkCollsions = function() {
  var self = this;
  this.otherSprites.forEach( function(sprite) {
    if (self.dx < sprite.dx + sprite.dWidth &&
      self.dx + self.dWidth > sprite.dx &&
      self.dy < sprite.dy + sprite.dHeight &&
      self.dy + self.dHeight > sprite.dy) {
        currentState = sprite.nextState;
    }
  });
};

Player.prototype.checkForWin = function(dt) {
  if (this.dy < this.GOAL ) {
    currentState = 'win';
  }
};

Player.prototype.setSprite = function() {
  this.sprite = playerImg;
};
