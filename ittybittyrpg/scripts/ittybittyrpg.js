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
        var tileset = document.getElementById("dungeon");
        var ds = this.datastore;
        for(var i=0; i<12; i++){
            for(var j=0; j<12; j++){
                ds.ctx.drawImage(tileset, 0,0, 32,32, i*32, j*32, 32,32);
            }
        }
        
    }
}


window.addEventListener("DOMContentLoaded", function(e){
    console.log("addEventListener:", e);
    ibrpg.init();
});

window.addEventListener("load", function(e){
    console.log("addEventListener", e);
    //ibrpg.xx_renderOneTile();
    ibrpg.xx_renderLayer();
})