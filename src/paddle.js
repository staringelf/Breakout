export default class Paddle {
    constructor (game, characterstics) {
        this.game = game;
        this.gameWidth = game.width;
        this.width = characterstics.width;
        this.height = characterstics.height;

        this.maxSpeed = characterstics.maxSpeed;
        this.vel = 0;

        this.position = {
            x: game.width / 2 - this.width / 2,
            y: game.height - this.height - 10
        }
    }

    moveLeft () {
        this.vel = -this.maxSpeed;
    }

    moveRight () {
        this.vel = this.maxSpeed;
    }

    stop () {
        this.vel = 0;
    }

    draw (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update (dt) {
        this.position.x += this.vel;

        if (this.position.x < 0)
            this.position.x = 0;
        else if (this.position.x + this.width > this.gameWidth)
            this.position.x = this.gameWidth - this.width;
    }

    reset () {
        this.position = {
            x: this.game.width / 2 - this.width / 2,
            y: this.game.height - this.height - 12
        }
    }
}