/* global Phaser */

var game = new Phaser.Game(640,480, Phaser.AUTO, '');

var mainState = {
    init: function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    },
    preload: function(){
      this.load.image('floor', 'assets/images/ground.png');  
    },
    create: function(){
        var floor = this.game.add.sprite(0,440, 'floor');
    }
};

game.state.add('mainState', mainState);
game.state.start('mainState');

