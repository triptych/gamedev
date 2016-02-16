/* global Phaser */
console.log("game.js loading");
window.addEventListener("load", function() {
  console.log("window load called");
  var tileSize = 80; // px size of tiles
  var numRows = 4;
  var numCols = 5;
  var tileSpacing = 10; // in px
  var tilesArray = [];
  var selectedArray = [];
  var playSound;

  var game = new Phaser.Game(500, 500);


  // titleScreen Object state
  var titleScreen = function(game) {};
  titleScreen.prototype = {
    preload: function() {
      console.log("titleScreen preload called");
      game.load.spritesheet("soundicons", "sound.png", 80, 80);
      game.load.audio("select", ["sound.mp3", "sound.ogg"]);
      game.load.audio("right", ["right.mp3", "right.ogg"]);
      game.load.audio("wrong", ["wrong.mp3", "wrong.ogg"]);
    },
    create: function() {
      var style = {
        font: "48px Monospace",
        fill: "#00ff00",
        align: "center"
      };
      var text = game.add.text(game.width / 2, game.height / 2 - 100, "Crack Alien Code", style);
      text.anchor.set(0.5);
      var soundButton = game.add.button(game.width / 2 - 100, game.height / 2 + 100, "soundicons", this.startGame, this);
      soundButton.anchor.set(0.5);

      soundButton = game.add.button(game.width / 2 + 100, game.height / 2 + 100, "soundicons", this.startGame, this);
      soundButton.frame = 1;
      soundButton.anchor.set(0.5);

    },
    startGame: function(target) {
      if (target.frame == 0) {
        playSound = true;
      }
      else {
        playSound = false;
      }
      game.state.start("PlayGame");

    }
  }


  // playGame Object state
  var playGame = function(game) {};
  playGame.prototype = {
    soundArray: [],
    preload: function() {
      console.log("in preload");
      game.load.spritesheet('tiles', 'tiles3.png', tileSize, tileSize);
    },
    create: function() {
      console.log("In playGame.prototype");
      //game.add.image(0,0,"tiles");
      this.placeTiles();

      if (playSound) {
        this.soundArray[0] = game.add.audio("select", 1);
        this.soundArray[1] = game.add.audio("right", 1);
        this.soundArray[2] = game.add.audio("wrong", 1);
      }

    },
    placeTiles: function() {
      console.log("in placeTiles");
      var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * tileSpacing)) / 2;
      var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * tileSpacing)) / 2;

      for (var i = 0; i < numRows * numCols; i++) {
        tilesArray.push(Math.floor(i / 2));
      }
      console.log("my tile values: " + tilesArray);

      for (i = 0; i < numRows * numCols; i++) {
        var from = game.rnd.between(0, tilesArray.length - 1);
        var to = game.rnd.between(0, tilesArray.length - 1);
        var temp = tilesArray[from];
        tilesArray[from] = tilesArray[to];
        tilesArray[to] = temp;
      }


      for (var i = 0; i < numCols; i++) {
        for (var j = 0; j < numRows; j++) {

          var tile = game.add.button(
            leftSpace + i * (tileSize + tileSpacing),
            topSpace + j * (tileSize + tileSpacing), "tiles",
            this.showTile, this);

          tile.frame = 10;
          tile.value = tilesArray[j * numCols + i];
        }
      }
    },
    showTile: function(target) {
      console.log("show me!");
      console.log("this tile has value = " + target.value);
      if (selectedArray.length < 2 && selectedArray.indexOf(target) == -1) {
        if (playSound) {
          this.soundArray[0].play();
        }

        target.frame = target.value;
        selectedArray.push(target);
      }

      if (selectedArray.length == 2) {
        game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
      }

    },
    checkTiles: function() {
      if (selectedArray[0].value == selectedArray[1].value) {
        if (playSound) {
          this.soundArray[1].play();
        }
        selectedArray[0].destroy();
        selectedArray[1].destroy();

      }
      else {
        if (playSound) {
          this.soundArray[2].play();
        }
        selectedArray[0].frame = 10;
        selectedArray[1].frame = 10;
      }
      selectedArray.length = 0;

    }
  }

  // add the game states, start the game

  game.state.add("TitleScreen", titleScreen);
  game.state.add("PlayGame", playGame);
  //game.state.start("Playgame");
  game.state.start("TitleScreen");
})
