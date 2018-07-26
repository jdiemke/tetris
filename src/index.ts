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

canvas.addEventListener('touchstart', touchHandler1);
canvas.addEventListener('touchend', touchHandler12);

function touchHandler12(e) {
    touchLeft = false;
    touchRight = false;
}

function inside(x: number, y: number, xcent: number, ycent: number, radius: number): boolean {
    const xdiff = x - xcent;
    const ydiff = y - ycent;
    const length = Math.sqrt(xdiff * xdiff + ydiff * ydiff);

    return length < radius;
}

const startPos: Position = new Position(0, 0);
let touchLeft = false;
let touchRight = false;
let fullscreen = false;

function getMousePos(canv: HTMLCanvasElement, evt: TouchEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function touchHandler1(e: TouchEvent) {

    if (fullscreen === false) {
        FullscreenUtils.fullscreen(document.documentElement);
        fullscreen = true;
    }
    if (e.touches) {
        const pos = getMousePos(canvas, e);
        const playerX = pos.x;
        const playerY = pos.y;
        console.log('start x: ' + playerX + ', y: ' + playerY);
        e.preventDefault();
        e.stopPropagation();
        startPos.x = playerX;
        startPos.y = playerY;
        console.log(playerX);

        if (inside(playerX, playerY, 640 - 50 - 10, 360 - 50 - 10, 50)) {
            const oldTiles = shape.tiles;
            shape.rotate();
            if (field.collides(shape)) {
                shape.tiles = oldTiles;
            } else {
                soundManager.play(Sound.ROTATION);
            }
        }

        if (inside(playerX, playerY, 50 + 10, 360 - 50 - 10, 50)) {
            console.log('left ');
            shape.position.x -= 1;
            if (field.collides(shape)) {
                shape.position.x += 1;
            }
        }

        if (inside(playerX, playerY, 640 - 100 - 50 - 20, 360 - 50 - 10, 50)) {
            do {
                shape.position.y += 1;
            } while (!field.collides(shape));

            soundManager.play(Sound.DROP);
            shape.position.y -= 1;
            field.setBlocks(shape);
            shape = futureShape;
            futureShape = new ShapeSpawner().getNextShape(image);
            if (field.removeFullRows()) {
                soundManager.play(Sound.REMOVE_ROWS);
            }

        }

        if (inside(playerX, playerY, 50 + 10 + 100 + 10, 360 - 50 - 10, 50)) {
            console.log('right ');
            shape.position.x += 1;
            if (field.collides(shape)) {
                shape.position.x -= 1;
            }
        }

    }
}

document.addEventListener('keydown', (event) => {

    if (event.keyCode === 70) {
        FullscreenUtils.fullscreen(document.documentElement);
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

    if (event.keyCode === 40) {
        do {
            shape.position.y += 1;
        } while (!field.collides(shape));

        soundManager.play(Sound.DROP);
        shape.position.y -= 1;
        field.setBlocks(shape);
        shape = futureShape;
        futureShape = new ShapeSpawner().getNextShape(image);
        if (field.removeFullRows()) {
            soundManager.play(Sound.REMOVE_ROWS);
        }
    }
});

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
        if (gamepad.isLeft(0, -1) || touchLeft) {
            shape.position.x -= 1;
            if (field.collides(shape)) {
                shape.position.x += 1;
            }
        }

        if (gamepad.isLeft(0, 1) || touchRight) {
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
                if (field.removeFullRows()) {
                    soundManager.play(Sound.REMOVE_ROWS);
                }
            }
        }

        inputElapsedTime = Date.now();
    }

    if (shape !== null) {
        if (Date.now() > elapsedTime + 500) {
            shape.position.y += 1;
            if (field.collides(shape)) {
                soundManager.play(Sound.DROP);
                shape.position.y -= 1;
                field.setBlocks(shape);
                shape = futureShape;
                futureShape = new ShapeSpawner().getNextShape(image);
                if (field.removeFullRows()) {
                    soundManager.play(Sound.REMOVE_ROWS);
                }
            }
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

    futureShape.drawAt(context, new Position(640 / 2 + (12 * 16) / 2 + 16, 12+16));

    drawTouchButtons();

    requestAnimationFrame(() => draw());
}

function drawTouchButtons(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.beginPath();
    context.arc(50 + 10, 360 - 50 - 10, 50, 0, Math.PI * 2, true);

    context.lineWidth = 3;
    context.strokeStyle = '#bbbbbb';
    context.stroke();

    context.beginPath();
    context.arc(50 + 10 + 100 + 10, 360 - 50 - 10, 50, 0, Math.PI * 2, true);

    context.lineWidth = 3;
    context.strokeStyle = '#bbbbbb';
    context.stroke();

    context.beginPath();
    context.arc(640 - 50 - 10, 360 - 50 - 10, 50, 0, Math.PI * 2, true);

    context.lineWidth = 3;
    context.strokeStyle = '#bbbbbb';
    context.stroke();

    context.beginPath();
    context.arc(640 - 100 - 50 - 20, 360 - 50 - 10, 50, 0, Math.PI * 2, true);

    context.lineWidth = 3;
    context.strokeStyle = '#bbbbbb';
    context.stroke();
}
