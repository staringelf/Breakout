import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';

import {buildWall, patternsLandscape, patternsPortrait} from './walls.js';

export const GAMESTATE = {

    PAUSED: 0,

    RUNNING: 1,
    
    MENU: 2,
    
    GAMEOVER: 3,

    NEWLEVEL: 4

}

export const ORIENTATION = {

    LANDSCAPE: 0,

    PORTRAIT: 1

}

export default class Game {
    constructor (width, height) {
        this.width = width;
        this.height = height;

        this.createBoard(width, height);
    
        this.state = GAMESTATE.MENU;

        this.orientation = this.width > this.height + 50 ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;

        let [paddleCharacterstics, ballCharacterstics] = [{}, {}]
        switch (this.orientation) {
            case ORIENTATION.LANDSCAPE:
                paddleCharacterstics = {
                    width: this.width / 6,
                    height: 10,
                    maxSpeed:  this.width / 100
                };
                ballCharacterstics = {
                    radius: this.width > 750 ? .005 * this.width : 4.5,
                    vel: {x: this.height / 150, y: this.height / 150} 
                }
                break;
            case ORIENTATION.PORTRAIT:
                paddleCharacterstics = {
                    width: this.width / 4,
                    height: 6,
                    maxSpeed: 1.5 * this.height / 100
                };
                ballCharacterstics = {
                    radius: this.width > 750 ? .005 * this.width : 4.5,
                    vel: {x: height / 150, y: height / 150} 
                }
                break;
        }
        this.paddle = new Paddle(this, paddleCharacterstics);
        this.ball = new Ball(this, ballCharacterstics);
     
        this.elements = [this.ball, this.paddle];

        this.lives = 20;
    
        this.level = 1;

        this.wall = [];

        new InputHandler(this, this.paddle);

    }

    start () {
        if(this.state !== GAMESTATE.MENU && this.state !== GAMESTATE.NEWLEVEL)
            return;
        if(this.state === GAMESTATE.NEWLEVEL)
            this.reset();
        this.state = GAMESTATE.RUNNING;
        switch (this.orientation){
            case ORIENTATION.LANDSCAPE: 
                this.wall = buildWall(this, patternsLandscape[`pattern${this.level}`]);
                break;
            case ORIENTATION.PORTRAIT:
                this.wall = buildWall(this, patternsPortrait[`pattern${this.level}`]);
                break;
        }
    }

    draw (ctx){
        [...this.elements, ...this.wall].forEach(element => element.draw(ctx));

        if(this.state === GAMESTATE.PAUSED) {
          ctx.rect(0, 0, this.width, this.height);  
          ctx.fillStyle = 'rgba(0,0,0,0.4)';
          ctx.fill();

          ctx.font = '30px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText('PAUSED', this.width / 2, this.height / 2);
        }
        
        if(this.state === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.width, this.height);  
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fill();
  
            ctx.font = '30px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('Press SPACE To Start', this.width / 2, this.height / 2);
        }

        if(this.state === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.width, this.height);  
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fill();
  
            ctx.font = '30px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', this.width / 2, this.height / 2);
        }
    }

    update (dt) {
        if (!this.lives)
            this.state = GAMESTATE.GAMEOVER;
    
        if(this.state === GAMESTATE.PAUSED || this.state === GAMESTATE.MENU ||this.state === GAMESTATE.GAMEOVER) 
            return;

        if(!this.wall.length){
            console.log('cleared');
            this.state = GAMESTATE.NEWLEVEL;
            this.level += 1;
            this.start();
        }
        [...this.elements, ...this.wall].forEach(element => element.update(dt));
        this.wall = this.wall.filter(brick => !brick.delete);
    }

    reset () {
        this.elements.forEach(element => element.reset());
    }

    togglePause () {
        this.state = this.state === GAMESTATE.PAUSED ? GAMESTATE.RUNNING : GAMESTATE.PAUSED;   
    }

    createBoard (width, height) {
        const board = document.createElement('canvas');
        [board.width, board.height]= [width, height];
        [board.style.width, board.style.height] = [width + 'px', height + 'px'];
        board.id = 'game-screen';
        document.body.insertAdjacentElement('afterbegin', board);
        this.canvas = board;
        return this;
    }

    getBrickDimensions () {
        const brickDimensions = {width: 40, height: 10};
        switch (this.orientation) {
            case ORIENTATION.LANDSCAPE:
                brickDimensions.width = (this.width - 10 * 10) / 15;
                brickDimensions.height = this.height / 20;
                brickDimensions.offsets = {top: 10, left: 2 * brickDimensions.width};
                brickDimensions.margin = {x: 10, y: 15};
                break;
            case ORIENTATION.PORTRAIT:
                brickDimensions.width = (this.width - 6 * 3) / 9;
                brickDimensions.height = this.height / 33;
                brickDimensions.offsets = {top: 10, left: brickDimensions.width - 6};
                brickDimensions.margin = {x: 3, y:  brickDimensions.height};
                break;
        }
        return brickDimensions;
    }
}