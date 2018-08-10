
import background from './assets/background.png';
import digits from './assets/digits.png';
import menu2 from './assets/main-menu.png';
import Tiles from './assets/sprites2.png';
import menu from './assets/title.png';
import { FullscreenUtils } from './fullscreen/FullscreenUtils';
import { Position } from './Position';
import { Shape } from './Shape';
import { TetrisGame } from './TetrisGame';

import { ShapeType } from './ShapeType';

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = 256;
canvas.height = 224;

canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
    'image-rendering: -moz-crisp-edges;' + // FireFox
    'image-rendering: -o-crisp-edges;' +  // Opera
    'image-rendering: -webkit-crisp-edges;' + // Chrome
    'image-rendering: crisp-edges;' + // Chrome
    'image-rendering: -webkit-optimize-contrast;' + // Safari
    'image-rendering: pixelated; ' + // Future browsers
    '-ms-interpolation-mode: nearest-neighbor;'; // IE

canvas.style.width = `${256 * 2}px`;
canvas.style.height = `${224 * 2}px`;
document.body.appendChild(canvas);

const context: CanvasRenderingContext2D = canvas.getContext('2d');

const image = new Image();
image.src = background;

const digitsImage = new Image();
digitsImage.src = digits;

const menuImage = new Image();
menuImage.src = menu;

const menuImage2 = new Image();
menuImage2.src = menu2;

let tetris: TetrisGame;

const imageSp = new Image();
imageSp.onload = () => {
    tetris = new TetrisGame(context, imageSp);
    requestAnimationFrame(() => draw());
};
imageSp.src = Tiles;

let state: number = 0;

function draw(): void {

    if (state === 0) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage, 0, 0, 256, 224, 0, 0, 256, 224);
    } else if (state === 1) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage2, 0, 0, 256, 224, 0, 0, 256, 224);
    } else {
        context.setTransform(1, 0, 0, 1, 0, 0);

        context.fillStyle = '#222222';
        context.fillRect(0, 0, 640, 360);
        context.drawImage(image, 0, 0, 256, 224, 0, 0, 256, 224);

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
        if (tetris.state === 1) {
            drawRemoval();
        }
    }

    requestAnimationFrame(() => draw());
}

function drawRemoval(): void {
    context.translate(96, 40);
    const diff = Date.now() - tetris.oldDropTime;
    if (diff < 0) {
        console.warn('negative', diff);
    }
    const time = Math.floor(Math.max(0, diff) / TetrisGame.FULL_ROW_ANIMATION_DELAY * 6) % 6;
    context.fillStyle = 'black';
    tetris.fullRows.forEach((x: number) => {
        context.fillRect(5 * 8 - time * 8, x * 8, time * 8 * 2, 8);
    });

    if (tetris.fullRows.length === 4) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        const flicker: number = Math.floor(Date.now() * 0.02) % 2;

        context.fillStyle = 'white';

        if (flicker === 1) {
            context.globalAlpha = 0;
        } else {
            context.globalAlpha = 1;
        }

        context.fillRect(0, 0, 256, 224);
        context.globalAlpha = 1;
    }
}

function drawNextShape(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);

    const shape = tetris.getFuture();
    const height: number = shape.tiles.length * 8;
    const width: number = shape.tiles[0].length * 8;
    shape.drawAt(context, new Position(208 - width / 2, 124 - height / 2));
}

function pad(orig: string, length: number, char: string): string {
    const leng: number = orig.length;
    return char.repeat(Math.max(0, length - leng)) + orig;
}

function drawStatistics(): void {

    drawNum(152, 16, pad(tetris.lineCounter.toString(), 3, '0')); // 3
    drawNum(192, 56, pad(tetris.score.toString(), 6, '0')); // 6
    drawNum(192, 32, pad('31337', 6, '0')); // 3

    drawNum(208, 160, pad(tetris.level.toString(), 2, '0')); // 2

    drawNum(48, 88, pad(tetris.getStatistics().get(ShapeType.T).toString(), 3, '0')); // 3
    drawNum(48, 88 + 16, pad(tetris.getStatistics().get(ShapeType.J).toString(), 3, '0')); // 3
    drawNum(48, 88 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.Z).toString(), 3, '0')); // 3
    drawNum(48, 88 + 16 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.O).toString(), 3, '0')); // 3
    drawNum(48, 88 + 16 + 16 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.S).toString(), 3, '0')); // 3
    drawNum(48, 88 + 16 + 16 + 16 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.L).toString(), 3, '0')); // 3
    drawNum(48, 88 + 16 + 16 + 16 + 16 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.I).toString(), 3, '0')); // 3
}

function drawNum(x: number, y: number, num: string): void {
    const myNum: string = '' + num;
    for (let i: number = 0; i < myNum.length; i++) {
        drawDigit(x + i * 8, y, myNum.charCodeAt(i));
    }
}

function drawDigit(x: number, y: number, char: number): void {
    const index: number = char - '0'.charCodeAt(0);
    context.drawImage(digitsImage, 8 * index, 0, 8, 8,
        x, y, 8, 8
    );
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

    if (event.keyCode === 83) {
        if (state === 1) {
            tetris.start();
        }
        state++;
    }

    // soft drop: arrow down
    if (event.keyCode === 40) {
        // FIXME: remove this side effect code
        // maybe use const fps with num of frames for timing?
        tetris.nextDropTime = Date.now();
        tetris.moveDown();
    }

    // hard drop: space
    if (event.keyCode === 32) {
        tetris.hardDrop();
    }

});
