import { FullscreenUtils } from './fullscreen/FullscreenUtils';
import { Position } from './Position';
import { Shape } from './Shape';
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

requestAnimationFrame(() => draw());

function draw(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.fillStyle = '#222222';
    context.fillRect(0, 0, 640, 360);

    tetris.update();

    tetris.getField().draw(context);

    context.globalAlpha = 0.24;
    tetris.getGhost().draw(context);
    context.globalAlpha = 1;

    const shape: Shape = tetris.getShape();
    if (shape !== null) {
        shape.draw(context);
    }

    drawNextShape();
    drawStatistics();

    requestAnimationFrame(() => draw());
}

function drawNextShape(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);
    tetris.getFuture().drawAt(context, new Position(640 / 2 + (12 * 16) / 2 + 16, 12 + 16));
}

function drawStatistics(): void {
    context.font = '30px Arial';
    context.fillStyle = 'red';
    context.fillText('Score: ' + tetris.score, 30, 50);
    context.fillText('Level: ' + tetris.level, 30, 50 + 30);
    context.fillText('Lines: ' + tetris.lineCounter, 30, 50 + 30 + 30);
}

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
