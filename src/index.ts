import { Sound } from './sound/Sound';

import { Playfield } from './Playfield';
import { Shape } from './Shape';
import { ShapeSpawner } from './ShapeSpawner';

import rotate from './assets/block-rotate.mp3';
import removalSound from './assets/line-removal.mp3';
import dropSound from './assets/slow-hit.mp3';
import Tiles from './assets/sprites.png';
import { Gamepad2 } from './Gamepad';
import { Position } from './Position';
import { SoundManager } from './sound/SoundManager';
import { FullscreenUtils } from './fullscreen/FullscreenUtils';

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
canvas.style.width = `${width * 2}px`;
canvas.style.height = `${height * 2}px`;
document.body.appendChild(canvas);

const context: CanvasRenderingContext2D = canvas.getContext('2d');

let field: Playfield;

let shape: Shape;
const image = new Image();
image.onload = () => {
    shape = new ShapeSpawner().getNextShape(image);
    field = new Playfield(10, 20, image);
    requestAnimationFrame(() => draw());

};
image.src = Tiles;



let elapsedTime: number = Date.now();

document.addEventListener('touchstart', touchHandler1);
document.addEventListener('touchmove', touchHandler);
document.addEventListener('touchend', touchHandler12);

function touchHandler12(e) {
    touchLeft = false;
    touchRight = false;
}

const startPos: Position = new Position(0, 0);
let touchLeft = false;
let touchRight = false;
let fullscreen = false;
function touchHandler1(e: TouchEvent) {

    if (fullscreen === false) {
        FullscreenUtils.fullscreen(canvas);
    }
    if (e.touches) {
        const playerX = e.touches[0].pageX - canvas.offsetLeft;
        const playerY = e.touches[0].pageY - canvas.offsetTop;
        console.log('start x: ' + playerX + ', y: ' + playerY);
        e.preventDefault();
        e.stopPropagation();
        startPos.x = playerX;
        startPos.y = playerY;
    }
}

function touchHandler(e) {
    if (e.touches) {
        const playerX = e.touches[0].pageX - canvas.offsetLeft;
        const playerY = e.touches[0].pageY - canvas.offsetTop;
        console.log('move x: ' + playerX + ', y: ' + playerY);
        e.preventDefault();

        const diff = (playerX - startPos.x) / (16 * 2);
        const diff2 = Math.round(diff) - Math.round((shape.position.x + shape.tiles[0].length / 2) - 4.5);
        console.log('diff ' + diff2);
        console.log('shape ' + (shape.position.x - 5));
        if (diff2 === 0) {
            touchLeft = false;
            touchRight = false;
        }
        if (diff2 < 0) {
            touchLeft = true;
            touchRight = false;
        }

        if (diff2 > 0) {
            touchLeft = false;
            touchRight = true;
        }

    }
}

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

    if (event.keyCode === 40) {
        shape.position.y += 1;
        if (field.collides(shape)) {
            soundManager.play(Sound.DROP);
            shape.position.y -= 1;
            field.setBlocks(shape);
            shape = new ShapeSpawner().getNextShape(image);
            if (field.removeFullRows()) {
                soundManager.play(Sound.REMOVE_ROWS);
            }
        }
    }
});

let inputElapsedTime = Date.now();

let rotatePressed: boolean = false;

function draw(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);
  
    context.fillStyle = '#000000';
    context.fillRect(1, 1, width-2, height-2);

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
                shape = new ShapeSpawner().getNextShape(image);
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
                shape = new ShapeSpawner().getNextShape(image);
                if (field.removeFullRows()) {
                    soundManager.play(Sound.REMOVE_ROWS);
                }
            }
            elapsedTime = Date.now();
        }
    }

    field.draw(context);
    if (shape !== null) {
        shape.draw(context);
    }
    requestAnimationFrame(() => draw());
}
