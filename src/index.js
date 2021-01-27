import Game from './game.js';

const [GAME_WIDTH, GAME_HEIGHT] = [window.innerWidth, window.innerHeight - (6 + 1)];

let lastTime = 0;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

const ctx = game.canvas.getContext('2d');

function gameLoop(timestamp) {
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(dt);
    game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
}


requestAnimationFrame(gameLoop);