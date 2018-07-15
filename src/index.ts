import { Playfield } from './Playfield';
import { Shape } from './Shape';
import { ShapeSpawner } from './ShapeSpawner';

import rotate from './assets/block-rotate.mp3';
import removalSound from './assets/line-removal.mp3';
import dropSound from './assets/slow-hit.mp3';
import Tiles from './assets/tiles.png';

const audioContext = new AudioContext();
let drop: AudioBuffer;
let rot: AudioBuffer;
let rem: AudioBuffer;
window.fetch(dropSound)
    .then((response: Response) => response.arrayBuffer())
    .then((arrayBuffer: ArrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer: AudioBuffer) => {
        drop = audioBuffer;
    });

window.fetch(removalSound)
    .then((response: Response) => response.arrayBuffer())
    .then((arrayBuffer: ArrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer: AudioBuffer) => {
        rem = audioBuffer;
    });

window.fetch(rotate)
    .then((response: Response) => response.arrayBuffer())
    .then((arrayBuffer: ArrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer: AudioBuffer) => {
        rot = audioBuffer;
    });

function play(audioBuffer: AudioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
}

const width: number = 10 * 16;
const height: number = 20 * 16;

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

document.addEventListener('keypress', (event) => {
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
            play(rot);
        }
    }

    if (event.keyCode === 40) {
        shape.position.y += 1;
        if (field.collides(shape)) {
            play(drop);
            shape.position.y -= 1;
            field.setBlocks(shape);
            shape = new ShapeSpawner().getNextShape(image);
            if (field.removeFullRows()) {
                play(rem);
            }
        }
    }
});

function draw(): void {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, width, height);
    if (shape !== null) {
        if (Date.now() > elapsedTime + 500) {
            shape.position.y += 1;
            if (field.collides(shape)) {
                play(drop);
                shape.position.y -= 1;
                field.setBlocks(shape);
                shape = new ShapeSpawner().getNextShape(image);
                if (field.removeFullRows()) {
                    play(rem);
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
