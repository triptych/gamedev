/* Itty Bitty RPG (engine) v 0.01 March 3, 2018 */

var ibrpg = {
    init: function(){
        console.log("hello world");
        console.log("self", self);
        console.log("this", this);
        
        this.initCanvas();
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
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.fillStyle = "red";
        ctx.fill();
        
        ctx.beginPath();
        ctx.rect(40, 40, 150, 100);
        ctx.fillStyle = "blue";
        ctx.fill();
        
    }
}


window.addEventListener("DOMContentLoaded", function(e){
    console.log("addEventListener:", e);
    ibrpg.init();
});