Bullet.prototype = new Ship();

function Bullet(){
    //console.log('create bullet');
    this.init.apply(this, arguments);
    this.speedFactor = 1;

    console.log(this);
    return this;
}

Bullet.prototype.init = function(collider, ctx, startX, startY){
    "use strict";
//
//    if (!ctx instanceof CanvasRenderingContext2D) {
//        return false;
//    }
    console.log(this);

    if (collider && collider.track) collider.track(this, this.stop, this);
    this.ctx = ctx;
    this.x = startX ? startX : 0;
    this.y = startY ? startY : 0;

    this.lastFrame = new Date();
    this.currenFrame = null;
    this.burst = false;

    this.applyBehavior = this.bullet;

    this.start();
};

Bullet.prototype.draw = function(x, y, angle, erase){
    "use strict";
    this.ctx.save();
    this.ctx.translate(this.x,this.y);


    this.ctx.rotate(angle);

    this.ctx.strokeStyle = erase ? bgColor : bulletColor;
    this.ctx.lineWidth = erase ? 4 : 2;
    this.ctx.lineCap = erase ? 'square' : 'none';
    this.ctx.lineJoin = erase ? 'round' : 'bevel';
    //this.ctx.shadowColor = erase ? bgColor : shadowColor;
    //this.ctx.shadowBlur = erase ? 20 : 10;
    this.ctx.beginPath();

    this.ctx.moveTo(0,0);
    this.ctx.lineTo(15, 0);
    //this.ctx.lineTo(-10, 0);

    //this.ctx.arc(0,0,1,0,doublePi,false);
    this.ctx.closePath();

    this.ctx.stroke();

    this.ctx.restore();
};

Bullet.prototype.action = function(){
    this.x = this.x + this.currentSpeedX;
    this.y = this.y + this.currentSpeedY;

    if (this.x < 0 || this.x > bounds.width || this.y < 0 || this.y > bounds.height) {
        this.stop();
    }
};