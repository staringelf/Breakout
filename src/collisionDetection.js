 export function detectCollision (ball, object) {
    
    const ballBottom = ball.position.y + ball.radius;
    const ballTop = ball.position.y - ball.radius;
    const ballLeft = ball.position.x - ball.radius;
    const ballRight = ball.position.x + ball.radius;    

    const objectHeight = object.height;
    const objectWidth = object.width;
    const objectTop = object.position.y - 2;
    const objectLeft = object.position.x - 2;
    const objectRight = object.position.x + object.width + 2;
    const objectBottom = object.position.y + object.height + 2;

    // const ballCollision = ballBottom >= objectTop && ballTop <= objectBottom && ballRight > objectLeft && ballLeft < objectRight;

    let collision = false;

    collision = {
        top: ballBottom >= objectTop && ballRight >= objectLeft && (ballRight - objectLeft <= objectWidth + ball.radius) && ballLeft <= objectRight && (objectRight - ballLeft <= objectWidth) && ballBottom - objectTop < objectHeight,
        right: ballLeft <= objectRight && ballBottom >= objectTop && ballTop <= objectBottom && (objectRight- ballLeft < objectWidth) && ballBottom - objectTop < objectHeight && (ballRight - objectLeft >= objectWidth),
        bottom: ballTop <= objectBottom && ballRight >= objectLeft && (ballRight - objectLeft <= objectWidth + ball.radius) && ballLeft <= objectRight && (objectRight - ballLeft <= objectWidth) && objectBottom - ballTop < objectHeight,
        left: ballRight >= objectLeft && ballBottom >= objectTop && ballTop <= objectBottom && (ballRight - objectLeft < objectWidth) && (ballBottom - objectTop < objectHeight) && (objectRight - ballLeft >= objectWidth)
    }

    if(!collision.top && !collision.right && !collision.bottom && !collision.left){
        collision = false;
    }

    return collision;
}