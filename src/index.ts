import { Sound } from './sound/Sound';

import { Playfield } from './Playfield';
import { Shape } from './Shape';
import { ShapeSpawner } from './ShapeSpawner';

import rotate from './assets/block-rotate.mp3';
import removalSound from './assets/line-removal.mp3';
import dropSound from './assets/slow-hit.mp3';
import Tiles from './assets/sprites.png';
import { FullscreenUtils } from './fullscreen/FullscreenUtils';
import { Gamepad2 } from './Gamepad';
import { Position } from './Position';
import { SoundManager } from './sound/SoundManager';

const gamepad: Gamepad2 = new Gamepad2();
const soundManager: SoundManager = new SoundManager();
let score: number = 0;
const startLevel: number = 0;
let level: number = 0;
let lineCounter: number = 0;

soundManager.loadSound(Sound.DROP, dropSound);
soundManager.loadSound(Sound.REMOVE_ROWS, removalSound);
soundManager.loadSound(Sound.ROTATION, rotate);

const width: number = 640;
const height: number = 360;

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
    'image-rendering: -moz-crisp-edges;' + // FireFox
    'image-rendering: -o-crisp-edges;' +  // Opera
    'image-rendering: -webkit-crisp-edges;' + // Chrome
    'image-rendering: crisp-edges;' + // Chrome
    'image-rendering: -webkit-optimize-contrast;' + // Safari
    'image-rendering: pixelated; ' + // Future browsers
    '-ms-interpolation-mode: nearest-neighbor;'; // IE

canvas.style.width = `${width * 2}px`;
canvas.style.height = `${height * 2}px`;
document.body.appendChild(canvas);

const context: CanvasRenderingContext2D = canvas.getContext('2d');

let field: Playfield;

let shape: Shape;
let futureShape: Shape;
const image = new Image();
image.onload = () => {
    shape = new ShapeSpawner().getNextShape(image);
    futureShape = new ShapeSpawner().getNextShape(image);
    field = new Playfield(10, 20, image);
    requestAnimationFrame(() => draw());
};
image.src = Tiles;

let elapsedTime: number = Date.now();

document.addEventListener('keydown', (event) => {

    if (event.keyCode === 70) {
        FullscreenUtils.fullscreen(canvas);
    }

    if (event.keyCode === 37) {
        shape.position.x -= 1;
        if (field.collides(shape)) {
            shape.position.x += 1;
        }
    }
    if (event.keyCode === 39) {
        shape.position.x += 1;
        if (field.collides(shape)) {
            shape.position.x -= 1;
        }
    }
    if (event.keyCode === 38) {
        const oldTiles = shape.tiles;
        shape.rotate();
        if (field.collides(shape)) {
            shape.tiles = oldTiles;
        } else {
            soundManager.play(Sound.ROTATION);
        }
    }

    // rotate counter clockwhise: y
    if (event.keyCode === 89) {
        const oldTiles = shape.tiles;
        shape.rotate();
        shape.rotate();
        shape.rotate();
        if (field.collides(shape)) {
            shape.tiles = oldTiles;
        } else {
            soundManager.play(Sound.ROTATION);
        }
    }

    // soft drop: arrow down
    if (event.keyCode === 40) {
        moveDown();
    }

    // hard drop: space
    if (event.keyCode === 32) {
        do {
            shape.position.y += 1;
        } while (!field.collides(shape));

        soundManager.play(Sound.DROP);
        shape.position.y -= 1;
        field.setBlocks(shape);
        shape = futureShape;
        futureShape = new ShapeSpawner().getNextShape(image);
        if (field.hasFullRows()) {
            const fullRows: number = field.getNumberOfFullRows();
            updateScore(level, fullRows);
            field.removeFullRows();
            soundManager.play(Sound.REMOVE_ROWS);
            lineCounter += fullRows;
            const firstLevelStep: number = Math.min(startLevel * 10 + 10, Math.max(100, startLevel * 10 - 50));
            level = Math.floor(Math.max(lineCounter - firstLevelStep, 0) / 10) +
                (lineCounter >= firstLevelStep ? 1 : 0);
        }
    }
});

// uses original nintendo scoring system used in NES, GB and SNES versions
function updateScore(currentLevel: number, numLines: number): void {

    let lineScore: number = 0;

    switch (numLines) {
        case 1:
            lineScore = 40;
            break;
        case 2:
            lineScore = 100;
            break;
        case 3:
            lineScore = 300;
            break;
        case 4:
            lineScore = 1200;
            break;
    }

    score += lineScore * (currentLevel + 1);
}

let inputElapsedTime = Date.now();

let rotatePressed: boolean = false;

function draw(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.fillStyle = '#222222';
    context.fillRect(0, 0, width, height);

    if (gamepad.isButtonPressed(0) && !rotatePressed) {
        rotatePressed = true;
        const oldTiles = shape.tiles;
        shape.rotate();
        if (field.collides(shape)) {
            shape.tiles = oldTiles;
        } else {
            soundManager.play(Sound.ROTATION);
        }
    }

    if (!gamepad.isButtonPressed(0)) {
        rotatePressed = false;
    }

    if (Date.now() > inputElapsedTime + 100) {
        if (gamepad.isLeft(0, -1)) {
            shape.position.x -= 1;
            if (field.collides(shape)) {
                shape.position.x += 1;
            }
        }

        if (gamepad.isLeft(0, 1)) {
            shape.position.x += 1;
            if (field.collides(shape)) {
                shape.position.x -= 1;
            }
        }

        if (gamepad.isLeft(1, 1)) {
            shape.position.y += 1;
            if (field.collides(shape)) {
                soundManager.play(Sound.DROP);
                shape.position.y -= 1;
                field.setBlocks(shape);
                shape = futureShape;
                futureShape = new ShapeSpawner().getNextShape(image);
                if (field.hasFullRows()) {
                    const fullRows: number = field.getNumberOfFullRows();
                    updateScore(level, fullRows);
                    field.removeFullRows();
                    soundManager.play(Sound.REMOVE_ROWS);
                    lineCounter += fullRows;
                    const firstLevelStep: number = Math.min(startLevel * 10 + 10, Math.max(100, startLevel * 10 - 50));
                    level = Math.floor(Math.max(lineCounter - firstLevelStep, 0) / 10) +
                        (lineCounter >= firstLevelStep ? 1 : 0);
                }
            }
        }

        inputElapsedTime = Date.now();
    }

    if (shape !== null) {
        if (Date.now() > elapsedTime + getTetrominoSpeedInMillis(level)) {
            moveDown();
            elapsedTime = Date.now();
        }
    }

    field.draw(context);

    // draw ghost
    const ghost = new Shape(shape.tiles, image, 9);
    ghost.position.y = shape.position.y;
    ghost.position.x = shape.position.x;
    do {
        ghost.position.y += 1;
    } while (!field.collides(ghost));

    ghost.position.y -= 1;

    context.globalAlpha = 0.24;
    ghost.draw(context);
    context.globalAlpha = 1;

    if (shape !== null) {
        shape.draw(context);
    }
    context.setTransform(1, 0, 0, 1, 0, 0);

    futureShape.drawAt(context, new Position(640 / 2 + (12 * 16) / 2 + 16, 12 + 16));

    context.font = '30px Arial';
    context.fillStyle = 'red';
    context.fillText('Score: ' + score, 30, 50);
    context.fillText('Level: ' + level, 30, 50 + 30);
    context.fillText('Lines: ' + lineCounter, 30, 50 + 30 + 30);

    requestAnimationFrame(() => draw());
}

function moveDown(): void {
    shape.position.y += 1;
    if (field.collides(shape)) {
        soundManager.play(Sound.DROP);
        shape.position.y -= 1;
        field.setBlocks(shape);
        shape = futureShape;
        futureShape = new ShapeSpawner().getNextShape(image);
        if (field.hasFullRows()) {
            const fullRows: number = field.getNumberOfFullRows();
            updateScore(level, fullRows);
            field.removeFullRows();
            soundManager.play(Sound.REMOVE_ROWS);
            lineCounter += fullRows;

            const firstLevelStep: number = Math.min(startLevel * 10 + 10, Math.max(100, startLevel * 10 - 50));
            level = Math.floor(Math.max(lineCounter - firstLevelStep, 0) / 10) +
                (lineCounter >= firstLevelStep ? 1 : 0);
        }
    }
}

function getTetrominoSpeedInMillis(currentLevel: number): number {
    return convertFrameToMilliseconds(convertLevelToFramesPerGridCell(currentLevel));
}

function convertFrameToMilliseconds(frames: number): number {
    const NES_FPS: number = 60.098814;
    return 1000 / NES_FPS * frames;
}

function convertLevelToFramesPerGridCell(currentLevel: number): number {
    if (currentLevel === 0) {
        return 48;
    } else if (currentLevel === 1) {
        return 43;
    } else if (currentLevel === 2) {
        return 38;
    } else if (currentLevel === 3) {
        return 33;
    } else if (currentLevel === 4) {
        return 28;
    } else if (currentLevel === 5) {
        return 23;
    } else if (currentLevel === 6) {
        return 18;
    } else if (currentLevel === 7) {
        return 13;
    } else if (currentLevel === 8) {
        return 8;
    } else if (currentLevel === 9) {
        return 6;
    } else if (currentLevel >= 10 && currentLevel <= 12) {
        return 5;
    } else if (currentLevel >= 13 && currentLevel <= 15) {
        return 4;
    } else if (currentLevel >= 16 && currentLevel <= 18) {
        return 3;
    } else if (currentLevel >= 19 && currentLevel <= 28) {
        return 2;
    } else if (currentLevel >= 29) {
        return 1;
    }
}
