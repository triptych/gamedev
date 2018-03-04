/* Itty Bitty RPG (engine) v 0.01 March 3, 2018 */

var ibrpg = {
    init: function(){
        console.log("hello world");
        console.log("self", self);
        console.log("this", this);
        
        this.initCanvas();
        this.xx_renderOneTile();
    },
    state: {
        version: "0.01",
        title: "Itty Bitty RPG"
    },
    datastore: {
        cv: null,
        ctx: null,
        img: null
    },
    initCanvas: function(){
        var ds = this.datastore;
        var ctx;
        console.log("ds:", ds);
        ds.cv = document.getElementById("ittybittyrpg");
        ds.cv.setAttribute("width", 12 * 32 + "px");
        ds.cv.setAttribute("height", 12 * 32 + "px");
        console.log("dom canvas",ds.cv)
        ctx = ds.ctx = ds.cv.getContext("2d");
        console.log(ds.ctx);
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
        ctx.beginPath();
        ctx.rect(0,0,12*32,12*32);
        ctx.fillStyle = "black";
        ctx.fill();
    },
    xx_renderOneTile: function(){
        console.log("in xx_renderOneTile");
        var tileset = document.getElementById("dungeon");
        console.log("tileset:", tileset);
        var ds = this.datastore;
        ds.ctx.drawImage(tileset, 0, 0, 32, 32);
    },
    xx_renderLayer: function(){
        var tileset = document.getElementById("dungeoncrawl");
        console.log("tileset", tileset)
        var ds = this.datastore;
        var dgcHeightInTiles = 64;
        var dgcWidthInTiles = 48;
        var randomX = Math.floor(Math.random() * dgcWidthInTiles) *32;
        var randomY = Math.floor(Math.random() * dgcHeightInTiles) *32;
        console.log("randomx", randomX)
        console.log("randomY", randomY)
        this.initCanvas();
        for(var i=0; i<12; i++){
            for(var j=0; j<12; j++){
                ds.ctx.drawImage(tileset, Math.floor(Math.random() * dgcWidthInTiles) *32 ,Math.floor(Math.random() * dgcHeightInTiles) *32, 32,32, i*32, j*32, 32,32);
            }
        }
        
    }, 
    xx_timedUpdate: function(){
        console.log("timedUpdate")
        window.setInterval(function(){
            ibrpg.xx_renderLayer();
            
        }, 200);
        // ibrpg.xx_renderLayer();
        // window.requestAnimationFrame(ibrpg.xx_timedUpdate)
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

