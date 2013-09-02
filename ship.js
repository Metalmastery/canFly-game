function Ship() {
    "use strict";

    this.init.apply(this, arguments);
    //console.log(this);
    return this;
}

Ship.prototype.init = function(collider, ctx, startX, startY, behavior, behaviorOptions) {
    "use strict";
//
//    if (!ctx instanceof CanvasRenderingContext2D) {
//        return false;
//    }
    if (collider && collider.track) {
        this.collider = collider;
        collider.track(this, this.stop, this);
    }
    this.ctx = ctx;
    this.x = startX ? startX : 0;
    this.y = startY ? startY : 0;

    this.lastFrame = new Date();
    this.currenFrame = null;
    //this.speedFactor = Math.random()*50+20;
    this.movingAngle = this.rotationAngle = this.currentSpeedY = this.currentSpeedX = this.rotationSpeed = 0;
    this.burst = false;

    this.keys = {};

    var self = this;

    switch (behavior) {
        case 'ship':
            this.speedFactor =70;

            this.applyBehavior = this.applyPressedKeys;
            this.bindEvents();
            break;
        case 'follow':
//            setInterval(function(){
//                self.keydownEvents['80']();
//            }, Math.random()*1000 + 500);
            this.applyBehavior = this.follow;
            this.speedFactor = Math.random()*50+20;
            this.target = behaviorOptions || null;
            this.distance = 0;
            this.targetAngle = 0;
            break;
        default :
            this.applyBehavior = this.bullet;
    }

    if (this.ctx) {
        this.start();
    }
};

Ship.prototype.applyPressedKeys = function(delta){
    console.log(this.keys);
    for (var i in this.keys) {
        if (this.keys[i] && this.keydownEvents[i]) {
            this.keydownEvents[i].apply(this, [delta]);
        }
    }
    //delete i;
};

Ship.prototype.start = function(){
    "use strict";

    console.log('start');

    var self = this,
        callback = function(){
            self.currenFrame = new Date();
            self.draw(self.x, self.y, self.rotationAngle, true);

            if (self.running) {
                self.applyBehavior(self.currenFrame - self.lastFrame);
                self.action();
                self.draw(self.x, self.y, self.rotationAngle);
                self.lastFrame = self.currenFrame;
                self.animation = requestAnimationFrame(callback);
            } else {
                cancelAnimationFrame(this.animation);
                self.destroy;
            }
        };
    self.animation = requestAnimationFrame(callback);
    self.running = true;
    //setInterval(callback, 100);
};

Ship.prototype.stop = function(){
    this.running = false;
    this.draw(this.x, this.y, this.rotationAngle, true);
    collider.untrack(this);
    this.x = - 1000;
    this.y = - 1000;
    delete this;
};

Ship.prototype.applyBehavior = function(delta){

};

Ship.prototype.bullet = function(delta){
    this.currentSpeedX = Math.cos(this.rotationAngle)*delta/this.speedFactor;
    this.currentSpeedY = Math.sin(this.rotationAngle)*delta/this.speedFactor;
};

Ship.prototype.draw = function (x, y, angle, erase) {
    "use strict";

    this.ctx.save();
    this.ctx.translate(this.x,this.y);


    this.ctx.rotate(angle);

    this.ctx.strokeStyle = erase ? bgColor : shipColor;
    this.ctx.lineWidth = erase ? 4 : 2;
    this.ctx.lineCap = erase ? 'square' : 'none';
    this.ctx.lineJoin = erase ? 'round' : 'bevel';
    //this.ctx.shadowColor = erase ? bgColor : shadowColor;
    //this.ctx.shadowBlur = erase ? 20 : 10;
    this.ctx.beginPath();


    this.ctx.lineTo(15, 0);
    this.ctx.lineTo(-15, 10);
    this.ctx.lineTo(-5, 0);
    this.ctx.lineTo(-15, -10);
    this.ctx.lineTo(15, 0);

    this.ctx.arc(0,0,5,0,doublePi,false);
    this.ctx.closePath();
    this.ctx.stroke();

    //if (this.keys['87']) {
        this.ctx.beginPath();

        console.log(this);

        this.ctx.strokeStyle = (this.keys['87'] && !erase) ? '#f00' : bgColor;
        this.ctx.lineWidth = (this.keys['87'] && !erase) ? 2 : 3;
        this.ctx.lineCap = (this.keys['87'] && !erase) ? 'none' : 'square';
        this.ctx.lineJoin = (this.keys['87'] && !erase) ? 'bevel' : 'round';

        this.ctx.moveTo(-11, 3);
        this.ctx.lineTo(-17, 0);
        this.ctx.lineTo(-11, -3);
        this.ctx.closePath();
        this.ctx.stroke();
    //}


    //this.ctx.closePath();



    this.ctx.restore();
};

Ship.prototype.follow = function(delta) {
    this.distance = Math.sqrt(Math.pow(this.x - this.target.x,2) + Math.pow(this.y - this.target.y,2));
    this.targetAngle = Math.atan2(this.y - this.target.y, this.x - this.target.x);
    this.rotationAngle = this.targetAngle + pi;
    //this.movingAngle = angle;
    //this.keydownEvents['87'].apply(this, [delta/100]);
    this.currentSpeedX = Math.cos(this.rotationAngle)*delta/this.speedFactor;
    this.currentSpeedY = Math.sin(this.rotationAngle)*delta/this.speedFactor;
    //console.log('FOLLOW', distance, angle, delta);
};

Ship.prototype.bindEvents = function(){
    "use strict";
    var self = this;
    if (this.ctx) {
        document.addEventListener('keydown', function(e){
    //        console.log(e.keyCode);
            self.keys[e.keyCode] = true;
            //self.keydownEvents[e.keyCode].call(self);
        });
        document.addEventListener('keyup', function(e){
            self.keys[e.keyCode] = false;
            //self.keydownEvents[e.keyCode].call(self);
        });
    }
};

Ship.prototype.keydownEvents = {
    '87' : function(time){
        //console.log(time);
        this.currentSpeedX = this.currentSpeedX + Math.cos(this.rotationAngle)*time/this.speedFactor;
        this.currentSpeedY = this.currentSpeedY + Math.sin(this.rotationAngle)*time/this.speedFactor;

        //this.movingAngle = Math.sqrt(Math.pow(this.currentSpeed,2) + 1 + 2*this.currentSpeed*Math.cos(this.movingAngle - this.rotationAngle));
    },
    '83' : function(time){
        this.currentSpeedX = this.currentSpeedX - Math.cos(this.rotationAngle)*time/this.speedFactor;
        this.currentSpeedY = this.currentSpeedY - Math.sin(this.rotationAngle)*time/this.speedFactor;
    },
    '65' : function(time){
        this.rotationSpeed -= time/10000;
    },
    '68' : function(time){
        this.rotationSpeed += time/10000;
    },
    '32' : function(){
        this.currentSpeedX = this.currentSpeedY = this.rotationSpeed = 0;
    },
    '80' : function(){
        var b = new Bullet(this.collider, this.ctx, this.x + 20*Math.cos(this.rotationAngle), this.y + 20*Math.sin(this.rotationAngle));
        b.rotationAngle = this.rotationAngle;
        this.keys['80'] = false;
    }
};

Ship.prototype.action = function(){

    //this.draw(this.x, this.y, this.rotationAngle,true);
    this.rotationAngle += this.rotationSpeed;

    this.x = ( this.x + this.currentSpeedX + bounds.width ) % bounds.width;
    this.y = ( this.y + this.currentSpeedY + bounds.height ) % bounds.height;


    //    this.currentSpeedY+=0.1;

    //this.draw(this.x, this.y, this.rotationAngle);
};