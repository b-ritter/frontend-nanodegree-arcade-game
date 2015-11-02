
// Enemies our player must avoid

var myCanvas = $('canvas');
var myCanvasWidth = myCanvas.width();
var myCanvasHeight = myCanvas.height();

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 166;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 171;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 200*dt;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.x > 404) {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.x = 202;
  this.y = 405;
  this.dx = 0;
  this.dy = 0;
  this.sprite = 'images/char-boy.png';
  this.width = 101;
  this.height = 171;
};

Player.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.checkCollsions();
  this.dx = 0;
  this.dy = 0;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  // Check the bounds, don't allow character to go out of screen
  if(key === 'left'){
    // x-min = 0
    if( this.x > 0 ){
      this.dx = -101;
    }
  } else if (key === 'up') {
    if( this.y > -10 ){
      // y-max = -10
      this.dy = -83;
    }
  } else if (key === 'down') {
    if( this.y < 405 ){
      // y-min = 405
      this.dy = 83;
    }
  } else {
    if( this.x < 404 ){
      // x-max = 404
      this.dx = 101;
    }
  }
};

Player.prototype.checkCollsions = function() {
  var player = this;
  allEnemies.forEach( function(enemy) {
    //console.log(player.sprite);
    // need to find the width
    if (player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.height + player.y > enemy.y) {
          console.log('collision!');
    }
  });
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var b1 = new Enemy();
var player = new Player();
var allEnemies = [b1];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
