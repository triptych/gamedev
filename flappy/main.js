// create our 'main' state that will contain the game
/* global Phaser */

var mainState = {
    preload: function(){
        console.log("preload called");
        // load the bird sprite
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },
    create: function(){
        console.log("create called");
        
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';


        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');
        
        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);
        
        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  
        
        // call the 'jump' function when the space key is hit
        var spaceKey = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        spaceKey.onDown.add(this.jump, this);
        
        //create an empty group
        this.pipes = game.add.group();

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        this.score = 0;
        this.labelScore = game.add.text(20,20,"0", {font: "30px Arial", fill: "#ffffff"});
        
    },
    update: function(){
        //console.log("update called random:", Math.random());
        
        // if the bird is out of the screen (too high or too low),
        // call the 'restartGame' function
        if(this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }
        
        game.physics.arcade.overlap( this.bird, this.pipes, this.restartGame, null, this);
    },
    // Make the bird jump
    jump: function(){
        // add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },
    
    // restart the game
    restartGame: function () {
        // start the 'main' state, which restarts the game
        game.state.start("main");
    },
    addOnePipe: function(x,y){
        // create a pipe at pos x and y
        var pipe = game.add.sprite(x, y, 'pipe');
        
        // add the pipe to our previously created group
        this.pipes.add(pipe);
        
        //enable physics on the pipe
        game.physics.arcade.enable(pipe);
        
        // add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;
        
        // automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function(){
        // Randomly pick a number between 1 and 5
        // this will be the hole position
        
        var hole = Math.floor(Math.random() * 5) + 1;
        
        // Add the 6 pipes
        // with one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++) {
            if(i != hole && i != hole +1){
                this.addOnePipe(400, i * 60 + 10);
            }
        }
        
        this.score += 1;
        this.labelScore.text = this.score;
        
    }    
};

// initialize Phaser and create a 400px by 490px game

var game = new Phaser.Game(400,490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');

