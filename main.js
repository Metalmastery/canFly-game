var pi = Math.PI,
    doublePi = Math.PI * 2,
    shipColor = '#fff',
    shadowColor = '#0f0',
    bulletColor = '#0f0',
    bgColor = '#000',
    shipPath = [],
    canvas = document.getElementById('canFly'),
    context = canvas.getContext('2d'),
    requestAnimationFrame = webkitRequestAnimationFrame,
    cancelAnimationFrame = webkitCancelRequestAnimationFrame,
    bounds = document.body.getBoundingClientRect();

canvas.width = bounds.width;
canvas.height = bounds.height;

//context.shadowColor = "#f00";
//context.shadowBlur    = 15;
//context.shadowOffsetX = 0;
//context.shadowOffsetY = 0;

var collider = new Collider();
console.log(collider);
var ship1 = new Ship(collider, context, 500, 100, 'ship');
var enemies = [];
//enemies.push(new Bullet(context, Math.random() * bounds.width, Math.random() * bounds.height ));
//enemies.push(new Bullet(collider, context, 100, 100));


for (var i = 1; i < 10; i++ ) {
    enemies.push(new Ship(collider, context, Math.random() * bounds.width, Math.random() * bounds.height, 'follow', ship1))
}
collider.start();
//var ship2 = new Ship(context, 100, 150, ship1);
//ship1.init(context, 100, 100);

//setInterval(function(){
//    var imgData = context.getImageData(0,0,canvas.width, canvas.height);
//    var pixels = imgData.data;
//    console.log(pixels.length);
//    for (var i = 3; i< pixels.length; i+=4){
//        pixels[i] >>= 1;
//    }
//    context.putImageData(imgData,0,0);
//}, 200);