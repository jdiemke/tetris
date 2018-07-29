import { FullscreenUtils } from './fullscreen/FullscreenUtils';
import { TetrisGame } from './TetrisGame';

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = 640;
canvas.height = 360;

canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
    'image-rendering: -moz-crisp-edges;' + // FireFox
    'image-rendering: -o-crisp-edges;' +  // Opera
    'image-rendering: -webkit-crisp-edges;' + // Chrome
    'image-rendering: crisp-edges;' + // Chrome
    'image-rendering: -webkit-optimize-contrast;' + // Safari
    'image-rendering: pixelated; ' + // Future browsers
    '-ms-interpolation-mode: nearest-neighbor;'; // IE

canvas.style.width = `${640 * 2}px`;
canvas.style.height = `${360 * 2}px`;
document.body.appendChild(canvas);

const context: CanvasRenderingContext2D = canvas.getContext('2d');

const tetris: TetrisGame = new TetrisGame(context);

document.addEventListener('keydown', (event: KeyboardEvent) => {

    if (event.keyCode === 70) {
        FullscreenUtils.fullscreen(canvas);
    }

    if (event.keyCode === 37) {
        tetris.moveLeft();
    }

    if (event.keyCode === 39) {
        tetris.moveRight();
    }

    if (event.keyCode === 38) {
        tetris.rotateClockwise();
    }

    // rotate counter clockwhise: y
    if (event.keyCode === 89) {
        tetris.rotateCounterclockwise();
    }

    // soft drop: arrow down
    if (event.keyCode === 40) {
        tetris.moveDown();
    }

    // hard drop: space
    if (event.keyCode === 32) {
        tetris.hardDrop();
    }

});
