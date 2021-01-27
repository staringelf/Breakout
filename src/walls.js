import Brick from './brick.js';

export function buildWall (game, pattern) {
    let wall = [];
    const brickDimensions = game.getBrickDimensions();
    const brickWidth = brickDimensions.width;
    const borderWidth = 6;
    const brickHeight = brickDimensions.height;
    const margin = brickDimensions.margin;
    const offsets = brickDimensions.offsets;
    console.log(offsets.left);
    pattern.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick)
                wall.push(new Brick(game, {x: (brickWidth + margin.x) * brickIndex + offsets.left + borderWidth, y: (brickHeight + margin.y) * rowIndex + offsets.top + borderWidth}, brickDimensions, brick));
        })
    });
    return wall;
};

export const patternsLandscape = {

    
    pattern1: [  
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0]
    ],

    pattern2: [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,3,3,3,0,0,0,1],
        [1,2,2,2,1,1,1,2,2,2,1],
        [1,2,2,2,1,1,1,2,2,2,1],
        [1,0,0,0,3,3,3,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1]
    ],
    

    pattern3: [
        [0,3,3,3,3,3,3,3,3,3,0],
        [0,3,3,3,3,3,3,3,3,3,0],
        [0,3,1,2,4,4,4,2,1,3,0],
        [0,3,1,2,4,4,4,2,1,3,0],
        [0,3,1,2,4,4,4,2,1,3,0],
        [0,3,3,3,3,3,3,3,3,3,0],
        [0,3,3,3,3,3,3,3,3,3,0],
    ],

    pattern4: [
        [0,2,2,2,2,2,2,2,2,2,0],
        [0,2,1,1,1,1,1,1,1,2,0],
        [0,2,1,1,1,1,1,1,1,2,0],
        [0,2,1,1,1,1,1,1,1,2,0],
        [0,2,1,1,1,1,1,1,1,2,0],
        [0,2,1,1,1,1,1,1,1,2,0],
        [0,2,2,2,2,2,2,2,2,2,0]
    ]

}

export const patternsPortrait = {
    pattern2: [
        [0,1,1,1,1,1,0],
        [3,0,1,3,1,0,3],
        [0,1,0,1,0,1,0],
        [0,3,1,4,1,3,0],
        [0,1,0,1,0,1,0],
        [3,0,1,3,1,0,3],
        [0,1,1,1,1,1,0],
    ],

    pattern1: [
        [0],
        [0],
        [0],
        [0,0,0,1,1,0,0],
        [0,0,0,2,2,0,0],
    ],

    pattern3: [
        [3,3,3,3,3,3,3],
        [3,4,4,3,4,4,3],
        [3,4,4,2,4,4,3],
        [3,1,1,2,1,1,3],
        [3,1,1,3,1,1,3],
        [3,1,4,4,4,1,3],
        [3,1,4,4,4,1,3],
        [3,3,3,3,3,3,3]     
    ]
}