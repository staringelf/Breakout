import {detectCollision} from './collisionDetection.js';

export default class Brick {
    constructor (game, position, dimensions, strength) {
        this.position = position; 
        this.game = game;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.delete = false;
        this.strength = strength;
        this.hit = strength >= 4 ? strength : null;
    }

    draw (ctx) {
        switch (this.strength){
            case 4: 
                ctx.fillStyle = '#fea91a';
                break;
            case 3: 
                ctx.fillStyle = '#36454f';
                break;
            case 2:
                ctx.fillStyle = '#7a7f80';
                break;
            case 1:
                ctx.fillStyle = '#a9a9a9';
                break;
                
        }
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
    }

    update () {
        const ball = this.game.ball;
        let collision = false;

        if(collision = detectCollision(ball, this)) {
        
            if(collision.top){
                ball.vel.y *= -1;
                if (this.strength === 4){
                    this.hit -= 1; 
                    this.strength = !this.hit ? 0 : 4;   
                } else{ 
                    this.strength -= 1;
                }
                if(!this.strength)
                    this.delete = true;
                console.log(collision);
            } else if(collision.bottom){
                ball.vel.y *= -1;
                if (this.strength === 4){
                    this.hit -= 1; 
                    this.strength = !this.hit ? 0 : 4;   
                } else{ 
                    this.strength -= 1;
                }
                if(!this.strength)
                    this.delete = true;
                console.log(collision);
            }
            
            if(collision.left){
                ball.vel.x *= -1;
                if (this.strength === 4){
                    this.hit -= 1; 
                    this.strength = !this.hit ? 0 : 4;   
                } else{ 
                    this.strength -= 1;
                }
                if(!this.strength)
                    this.delete = true;
                console.log(collision);
            
            } else if(collision.right){
                ball.vel.x *= -1;
                if (this.strength === 4){
                    this.hit -= 1; 
                    this.strength = !this.hit ? 0 : 4;   
                } else{ 
                    this.strength -= 1;
                }
                if(!this.strength)
                    this.delete = true;
                console.log(collision);
            
            }
    
        }
    }
}