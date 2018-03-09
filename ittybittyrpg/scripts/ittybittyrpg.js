/* Itty Bitty RPG (engine) v 0.01 March 3, 2018 */
const Constants = {
    DELAY: 10,
    WIDTH: 12,
    HEIGHT: 12,
    SPHEIGHT: 32,
    SPWIDTH: 32
    
}
var ibrpg = {
    init: function(){
        // console.log("hello world");
        // console.log("this", this);
        
        this.initCanvas();
        this.xx_renderOneTile();
    },
    state: {
        version: "0.01",
        title: "Itty Bitty RPG",
        delay: Constants.DELAY
    },
    datastore: {
        cv: null,
        ctx: null,
        img: null,
        delay: 0
    },
    world: {
      title: "testlevel",
      width: Constants.WIDTH,
      height: Constants.HEIGHT,
      spriteHeight: Constants.SPHEIGHT,
      spriteWidth: Constants.SPWIDTH,
      tileDef: {
          "w" : {
              type: "dungeoncrawl",
              name: "wall",
              xOffset: 0,
              yOffset: 14,
              collision: true
          },
          "f" : {
              type: "dungeoncrawl",
              name: "floor",
              xOffset: 0,
              yOffset: 15,
              collision: false
          }
      },
      character: {
        xOffset: 1,
        yOffset: 2,
        type: "dungeoncrawl",
        name: "character",
        pos: {
            x: 2,
            y: 2
        }
      },
      map:`w,w,w,w,w,w,w,w,w,w,w,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,w,f,w,
           w,f,f,f,f,f,f,f,f,w,w,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,w,w,w,w,w,w,w,w,w,w,w`
    },
    initCanvas: function(){
        var ds = this.datastore;
        var ctx;
        //.log("ds:", ds);
        ds.cv = document.getElementById("ittybittyrpg");
        ds.cv.setAttribute("width", Constants.WIDTH * Constants.SPWIDTH + "px");
        ds.cv.setAttribute("height", Constants.HEIGHT * Constants.SPHEIGHT + "px");
        //console.log("dom canvas",ds.cv)
        ctx = ds.ctx = ds.cv.getContext("2d");
        //console.log(ds.ctx);
        /**
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.fillStyle = "red";
        ctx.fill();
        
        ctx.beginPath();
        ctx.rect(40, 40, 150, 100);
        ctx.fillStyle = "blue";
        ctx.fill();
        **/
        /** initially fill with black **/
        // ctx.beginPath();
        // ctx.rect(0,0,12*32,12*32);
        // ctx.fillStyle = "black";
        // ctx.fill();
        this.clearCanvas();
    },
    clearCanvas: function(){
        var ctx = this.datastore.ctx;
        ctx.beginPath();
        ctx.rect(0,0,Constants.WIDTH * Constants.SPWIDTH, Constants.HEIGHT * Constants.SPHEIGHT);
        ctx.fillStyle = "black";
        ctx.fill();
        
    },
    xx_renderOneTile: function(){
        //console.log("in xx_renderOneTile");
        var tileset = document.getElementById("dungeon");
        //console.log("tileset:", tileset);
        var ds = this.datastore;
        ds.ctx.drawImage(tileset, 0, 0, Constants.SPHEIGHT, Constants.SPWIDTH);
    },
    xx_renderLayer: function(){
        var tileset = document.getElementById("dungeoncrawl");
        //console.log("tileset", tileset)
        var ds = this.datastore;
        var dgcHeightInTiles = 64;
        var dgcWidthInTiles = 48;
        var randomX = Math.floor(Math.random() * dgcWidthInTiles) * Constants.SPWIDTH;
        var randomY = Math.floor(Math.random() * dgcHeightInTiles) * Constants.SPHEIGHT;
        //console.log("randomx", randomX)
        //console.log("randomY", randomY)
        this.initCanvas();
        for(var i=0; i<12; i++){
            for(var j=0; j<12; j++){
                ds.ctx.drawImage(tileset, Math.floor(Math.random() * dgcWidthInTiles) * Constants.SPWIDTH ,Math.floor(Math.random() * dgcHeightInTiles) * Constants.SPHEIGHT, 32,32, i*32, j*32, 32,32);
                //console.log()
            }
        }
        
    },
    xx_checkCollision: function(oldXoffset,oldYoffset,newXoffset,newYoffset){
        var isCollision = false;
        var mapArr = this.world.map.split(",");
        const tileDef = ibrpg.world.tileDef[mapArr[(newYoffset*Constants.WIDTH) + newXoffset].trim()];
        
        
        console.log("tileDef tile:", tileDef);
        isCollision = tileDef.collision;
        
        return isCollision;
    },
    xx_timedUpdate: function(){
        //console.log("timedUpdate")
        ibrpg.datastore.interval = window.setInterval(function(){
            ibrpg.xx_renderLayer();
            ibrpg.datastore.delay = ibrpg.datastore.delay + 1;
            if(ibrpg.datastore.delay >= ibrpg.state.delay){
                window.clearInterval(ibrpg.datastore.interval);
                ibrpg.xx_renderLevel();
            }
            
        }, 200);
        // ibrpg.xx_renderLayer();
        // window.requestAnimationFrame(ibrpg.xx_timedUpdate)
    },
    xx_renderChar: function(){
        var ds = this.datastore;
        var ctx = ds.ctx;
        var char = this.world.character;
        
        var tileset = document.getElementById(char.type); 
        ctx.drawImage(tileset, 
            char.xOffset * Constants.SPWIDTH,
            char.yOffset * Constants.SPHEIGHT,
            Constants.SPWIDTH,
            Constants.SPHEIGHT,
            char.pos.x * Constants.SPWIDTH,
            char.pos.y * Constants.SPWIDTH,
            Constants.SPWIDTH,
            Constants.SPHEIGHT);
        
    },
    xx_renderLevel: function(){
        // assuming level is loaded
        var ds = this.datastore;
        var ctx = ds.ctx;
        var tileset = document.getElementById("dungeoncrawl");
        var mapArr = this.world.map.split(",");
        var tileDef = this.world.tileDef;
        console.log("mapArr:", mapArr);
        
        for(var i = 0; i < Constants.WIDTH; i++){
            for(var j = 0; j < Constants.HEIGHT; j++){
              ctx.drawImage(tileset, 
                tileDef[mapArr[(i*Constants.WIDTH) + j].trim()].xOffset * Constants.SPWIDTH, 
                tileDef[mapArr[(i*Constants.HEIGHT) + j].trim()].yOffset * Constants.SPHEIGHT,
                Constants.SPWIDTH,
                Constants.SPHEIGHT,
                j * Constants.SPWIDTH,
                i * Constants.SPHEIGHT,
                Constants.SPWIDTH,
                Constants.SPHEIGHT)
               
            }
        }
        
    }
}


window.addEventListener("DOMContentLoaded", function(e){
    console.log("addEventListener:", e);
    ibrpg.init();
    document.getElementById("dungeoncrawl").addEventListener("load", function(){
    console.log("crawl loaded")
    ibrpg.xx_timedUpdate();
})
});

window.addEventListener("click", function(e){
    console.log("addEventListener", e);
    //ibrpg.xx_renderOneTile();
    ibrpg.xx_renderLayer();
});

window.addEventListener("keydown", function(e){
    console.log("keydown");
    const keyName = event.key;
    const keyCode = event.keyCode;
    console.log('keydown event\n\n' + 'key: ' + keyName);
    console.log('keydown event\n\n' + 'keyCode: ' + keyCode);
    var charPos = ibrpg.world.character.pos
    
    if(keyName == "ArrowRight"){
        if(!ibrpg.xx_checkCollision(charPos.x,
            charPos.y, charPos.x+1, charPos.y)){
            ibrpg.world.character.pos.x+=1;
        }
        
    }
    if(keyName == "ArrowLeft"){
        // ibrpg.world.character.pos.x-=1;
        if(!ibrpg.xx_checkCollision(charPos.x,
            charPos.y, charPos.x-1, charPos.y)){
            ibrpg.world.character.pos.x-=1;
        }
    }
    if(keyName == "ArrowUp"){
        // ibrpg.world.character.pos.y-=1;
        if(!ibrpg.xx_checkCollision(charPos.x,
            charPos.y, charPos.x, charPos.y-1)){
            ibrpg.world.character.pos.y-=1;
        }
    }
    if(keyName == "ArrowDown"){
        // ibrpg.world.character.pos.y+=1;
        if(!ibrpg.xx_checkCollision(charPos.x,
            charPos.y, charPos.x, charPos.y+1)){
            ibrpg.world.character.pos.y+=1;
        }
    }
    
    ibrpg.xx_renderLevel();
    ibrpg.xx_renderChar();
    
});

