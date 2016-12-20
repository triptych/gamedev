// create our 'main' state that will contain the game
/* global Phaser */

var mainState = {
    preload: function(){
        console.log("preload called");
        // load the bird sprite
        game.load.image('bird', 'assets/bird.png');
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



        
    },
    update: function(){
        //console.log("update called random:", Math.random());
    }
}

// initialize Phaser and create a 400px by 490px game

var game = new Phaser.Game(400,490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');

