import {detectCollision} from './collisionDetection.js';

export default class Ball {
    constructor (game, characterstics) {
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.position = {x: 12, y: 150};
        this.initialVelX = characterstics.vel.x;
        this.initialVelY = characterstics.vel.y;
        this.vel = characterstics.vel;
        this.speed = this.getSpeed();
        this.radius = characterstics.radius;
        this.reset(); //overwrites position
    }

    draw (ctx) {
        ctx.fillStyle = '#fd1c03';
        ctx.beginPath();
        ctx.arc(this.position.x , this.position.y , this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    update (dt) { 
        this.position.x += this.vel.x;
        this.position.y += this.vel.y;

        if (this.position.x + this.radius > this.gameWidth - 2 || this.position.x - this.radius < 2)
            this.vel.x *= -1;

        if (this.position.y - this.radius < 0)
            this.vel.y *= -1;

        if (this.position.y + this.radius >= this.gameHeight){
            this.game.lives -= 1;
            this.game.reset();
        }  

        let collision = false;

        if (collision = detectCollision(this, this.game.paddle)){
            const paddle = this.game.paddle;
                const collisionPoint = this.position.x - (paddle.position.x + paddle.width / 2);
                const collisionAngle = (collisionPoint / (paddle.width / 2)) * (Math.PI / 3);
                this.position.y = paddle.position.y - this.radius - 2;
            
                if(collisionPoint > -paddle.width / 2.5 && collisionPoint < paddle.width / 2.5){
                    if((this.vel.x > 0 && paddle.vel > 0) || (this.vel.x < 0 && paddle.vel < 0))
                        this.vel.x += paddle.vel / paddle.maxSpeed / 4;
                    else 
                        this.vel.x -= paddle.vel / paddle.maxSpeed / 3;
                    this.vel.y *= -1;     
                } else{
                    this.vel.y = -this.speed *  Math.cos(collisionAngle); 
                    this.vel.x = this.speed * Math.sin(collisionAngle);
                }
                this.speed = this.getSpeed();
                console.log(this.speed);
    
        }
    }

    reset () {
        this.position.x = this.game.width / 2 - this.radius - this.game.paddle.width/8;
        this.position.y = this.game.height - 12 - this.game.paddle.height - this.radius - 1;
        this.vel.x = this.initialVelX;
        this.vel.y = this.initialVelY;
        this.speed = this.getSpeed();
    }

    getSpeed () {
        return Math.pow( Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2), 0.5);
    }
}