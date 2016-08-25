var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
canvas.width = window.innerWidth - 40; 
canvas.height = window.innerHeight;
paused = false;
var index = 189;
shapes = [];
//where things happen
function animate(time) { 
    if (!paused) {

        context.clearRect(0,0,canvas.width, canvas.height);
        for(var i=0;i<shapes.length;i++){
            shapes[i].y--;
            shapes[i].angle = shapes[i].angle + Math.PI/180;
            shapes[i].create();
        }
        index++;
        if(index%190==0){
            var object = new construct();
            shapes.push(object);
            if(shapes.length == 15){
                shapes.shift();
            }
        }
        window.requestNextAnimationFrame(animate);
    }
    function construct(){
        this.x = Math.floor((canvas.width)*Math.random() - 100);
        this.y = 0.7*canvas.height;
        this.create = rectangle;
        this.r = Math.floor(256*Math.random());
        this.g = Math.floor(256*Math.random());
        this.b = Math.floor(256*Math.random());
        this.a = 0.2;
        this.angle = Math.PI/180;
    }

    function rectangle(){
        /*
        context.save();
        context.beginPath();
        context.translate(this.x + 50, this.y + 50);
        context.rotate(this.angle);
        context.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
        context.fillRect( -50, -50, 100, 100);      
        context.closePath();
        context.translate(- this.x - 50, - this.y - 50);
        context.restore();
        */
        context.save();
        context.beginPath();
        context.translate(this.x - 50, this.y + 50);
        context.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
        context.arc(250, 200, 50, 0, Math.PI, true);
        context.quadraticCurveTo(250,400,300,200);
        context.moveTo(250,300);
        context.arc(250, 300, 2, 0, Math.PI, false);
        context.fill();  
        context.bezierCurveTo(245,307,260,314,250,321);
        context.stroke();
        context.closePath();
        context.translate(- this.x - 50, - this.y - 50);
        context.restore(); 
    }
}

//For Animation
window.requestNextAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame  || window.msRequestAnimationFrame ||
    function (callback, element) { 
        // Assume element is visible 
        var self = this,                
        start,                
        finish;
        window.setTimeout( function () {               
            start =+new Date(); callback(start);               
            finish =+new Date();
            self.timeout = 1000 / 60 -(finish - start);
        }, self.timeout);
    };
}
)
();

window.requestNextAnimationFrame(animate);