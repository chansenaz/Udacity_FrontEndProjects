//size of a game square
var XINC = 101;
var YINC = 83;

//make the player and enemy positions feel more natural
var Y_OFFSET = 20;

//player movement limits
var MAX_X = XINC * 8;
var MAX_Y = YINC * 7 - Y_OFFSET;

//starting X position. starting y position = MAX_Y
var STARTPOS_X = XINC * 4;

//enemy stats
var MAX_SPEED = 500;
var MIN_SPEED = 100;

//tolerance for collision detection
var COLLISION_OFFSET = 35;

var stars = [false, false, false, false, false, false, false, false, false];
//var stars = [true, true, true, true, true, true, true, true, false];

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Give the enemy a random speed factor
    //Math.random() * (max - min) + min;
    this.speedFactor = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;

    // Set a random starting x value
    this.x = Math.floor(Math.random() * -500) - XINC;

    // Set a random starting y value (5 possible rows)
    this.y = (Math.floor(Math.random() * 5) + 1) * YINC - Y_OFFSET;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > MAX_X + XINC) {
        this.x = Math.floor(Math.random() * -500) - XINC;
        this.y = (Math.floor(Math.random() * 5) + 1) * YINC - Y_OFFSET;
        this.speedFactor = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    } else {
        this.x += this.speedFactor * dt;
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
    this.sprite = "images/char-horn-girl.png";
    this.x = STARTPOS_X;
    this.y = MAX_Y;
};

//Player update function
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

//Player render function
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput() function
Player.prototype.handleInput = function(dir) {
    // Change the player's position based on the user keyboard input.
    if (dir == "up") {
        this.y = this.y - YINC;
    } else if (dir == "down") {
        this.y = this.y + YINC;
    } else if (dir == "left") {
        this.x = this.x - XINC;
    } else if (dir == "right") {
        this.x = this.x + XINC;
    }

    //limit player's movement
    if (this.x < 0) {
        this.x = 0;
    } else if (this.y <= (0 - Y_OFFSET)) {
        //add a star
        stars[this.x / XINC] = true;
        //back to starting position
        this.x = STARTPOS_X;
        this.y = MAX_Y;

        //if the player hits the top and all stars are collected, play sound
        var win = true;
        for (var i = 0; i < 9; i++) {
            if (stars[i] == false) {
                win = false;
                break;
            }
        }
        if (win) {
            new Audio('sounds/mario_win.mp3').play()
        }

    } else if (this.x > MAX_X) {
        this.x = MAX_X;
    } else if (this.y > MAX_Y) {
        this.y = MAX_Y;
    }
};


//Check for collisions between the player and the enemies
var checkCollisions = function(enemy, player) {
    for (var i = 0; i < enemy.length; i++) {
        if (enemy[i].y === player.y && (enemy[i].x > (player.x - COLLISION_OFFSET)
            && (enemy[i].x < player.x + COLLISION_OFFSET))) {
            // Move player back to starting position
            player.x = STARTPOS_X;
            player.y = MAX_Y;

            //reset stars
            for (var j = 0; j < 9; j++) {
                stars[j] = false;
            }
        }
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Fill the allEnemies array
for (var i = 0; i < 10; i++) {
    var newEnemy = new Enemy();
    allEnemies.push(newEnemy);
}



// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: "up",
        65: "left",
        83: "down",
        68: "right"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
