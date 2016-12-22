/* global Phaser */

// create the state that will contain the whole game
var mainState = {
    preload: function(){
        // preload assets here
        
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    },
    create: function(){
        // create the game here
        
        // set the background color to blue
        game.stage.backgroundColor = '#3598db';
        
        // start the arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add the physics engine to all game objects
        
        game.world.enableBody = true;
        
        // variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
        
        // create the player in the middle of the game
        this.player = game.add.sprite(70,100, 'player');
        
        // add gravity to make it fall
        this.player.body.gravity.y = 600;
        
        // create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        
        // design the level. x = wall, o = coin, ! = lava.
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!         !          x',
            '!                 o  x',
            '!         o          x',
            '!                    x',
            '!     o   !    x     x',
            'xxxxxxxxxxxxxxxx!!!!!x',            
        ];
        
        for(var i = 0; i < level.length; i++){
            for(var j = 0; j < level[i].length; j++){
                
                // create a wall and add it to the 'walls' group
                
                if(level[i][j] == 'x'){
                    var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                }
                
                // create a coin and add it to the 'coins' group
                else if(level[i][j] == 'o'){
                    var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                    this.coins.add(coin);
                }
                
                else if(level[i][j] == '!'){
                    var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                    this.coins.add(enemy);
                }
                
            }
        }
        
        
        
    },
    update: function(){
        // update the game 60 times a second
        
        // move the player when an arrow key is pressed
        if(this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
        } else if (this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
        } else {
            this.player.body.velocity.x = 0;
        }
        
        // make the player jump if he is touching the ground
        if(this.cursor.up.isDown && this.player.body.touching.down){
            console.log("up!")
            this.player.body.velocity.y = -250;
        }
        
        
        // make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);
        
        
        // call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        
        // call the restart function when the player touches the enemy
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    },
    takeCoin: function(player, coin){
        coin.kill();
    },
    restart: function(){
        game.state.start('main');
    }
    
    
    
};

// initialize the game and start our state

var game = new Phaser.Game(500,200);
game.state.add('main', mainState);
game.state.start('main');

