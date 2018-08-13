
/**
 * TODO:
 * - Add state machine or state class!
 * - Remove render code and move into render class
 * - Asset preloader
 * - different colors per level
 * - level selection
 * - credits
 * - game over
 * - high score
 * - add sound to menue
 * - limit menue selection to available set
 */

import arrows from './assets/arrows.png';
import background from './assets/background.png';
import digits2 from './assets/digits-red.png';
import digits from './assets/digits.png';
import menu2 from './assets/main-menu.png';
import Tiles from './assets/sprites2.png';
import menu from './assets/title.png';
import { FullscreenUtils } from './fullscreen/FullscreenUtils';
import { Position } from './Position';
import { Shape } from './Shape';
import { TetrisGame } from './TetrisGame';

import { ShapeType } from './ShapeType';
import { SoundManager } from './sound/SoundManager';

import 'jsxm/xm';
import 'jsxm/xmeffects';
import { OptionList } from './OptionList';

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

const digits2Image = new Image();
digits2Image.src = digits2;

const arrowsImage = new Image();
arrowsImage.src = arrows;

const menuImage = new Image();
menuImage.src = menu;

const menuImage2 = new Image();
menuImage2.src = menu2;

let tetris: TetrisGame;

const sm = new SoundManager();

declare function require(name: string);
let musicTypeOptions: OptionList<ArrayBuffer>;
let music: Array<ArrayBuffer> = [];

const imageSp = new Image();
imageSp.onload = () => {
    tetris = new TetrisGame(context, imageSp);
    Promise.all([
        sm.loadExtendedModule(require('./assets/music/tetris ingame.xm')),
        sm.loadExtendedModule(require('./assets/music/tetris ingame2.xm')),
        sm.loadExtendedModule(require('./assets/music/tetris ingame3.xm'))
    ]).then((res: Array<ArrayBuffer>) => {
        music = res;
        musicTypeOptions = new OptionList<ArrayBuffer>([
            res[0], res[1], res[2], null
        ], 0);
        musicTypeOptions.addChangeListener((t: ArrayBuffer) => {
            XMPlayer.stop();
            if (t !== null) {
                XMPlayer.load(t);
                XMPlayer.play();
            }
        });
        requestAnimationFrame(() => draw());
    });

};
imageSp.src = Tiles;

let state: number = 0;

const gameTypeOptions: OptionList<number> = new OptionList<number>([0, 1], 0);

function draw(): void {

    if (state === 0) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage, 0, 0, 256, 224, 0, 0, 256, 224);
    } else if (state === 1) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage2, 0, 0, 256, 224, 0, 0, 256, 224);
        drawArrows(63 + gameTypeOptions.getOption() * 96, 55, 58);
        drawArrows(103, 135 + musicTypeOptions.getIndex() * 16, 74);
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
            context.globalAlpha = 0.75;
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

    drawNum(48, 88, pad(tetris.getStatistics().get(ShapeType.T).toString(), 3, '0'), true); // 3
    drawNum(48, 88 + 16, pad(tetris.getStatistics().get(ShapeType.J).toString(), 3, '0'), true); // 3
    drawNum(48, 88 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.Z).toString(), 3, '0'), true); // 3
    drawNum(48, 88 + 16 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.O).toString(), 3, '0'), true); // 3
    drawNum(48, 88 + 16 + 16 + 16 + 16, pad(tetris.getStatistics().get(ShapeType.S).toString(), 3, '0'), true); // 3
    drawNum(48, 88 + 16 + 16 + 16 + 16 + 16,
        pad(tetris.getStatistics().get(ShapeType.L).toString(), 3, '0'), true); // 3
    drawNum(48, 88 + 16 + 16 + 16 + 16 + 16 + 16,
        pad(tetris.getStatistics().get(ShapeType.I).toString(), 3, '0'), true); // 3
}

function drawNum(x: number, y: number, num: string, red: boolean = false): void {
    const myNum: string = '' + num;
    const img: HTMLImageElement = red ? digits2Image : digitsImage;
    for (let i: number = 0; i < myNum.length; i++) {
        drawDigit(x + i * 8, y, myNum.charCodeAt(i), img);
    }
}

function drawDigit(x: number, y: number, char: number, img: HTMLImageElement): void {
    const index: number = char - '0'.charCodeAt(0);
    context.drawImage(img, 8 * index, 0, 8, 8,
        x, y, 8, 8
    );
}

function drawArrows(x: number, y: number, width: number): void {
    const flicker: number = Math.floor(Date.now() * 0.02) % 2;

    context.fillStyle = 'white';

    if (flicker === 1) {
        context.globalAlpha = 0;
    } else {
        context.globalAlpha = 1;
    }

    context.drawImage(arrowsImage, 0, 0, 8, 8,
        x, y, 8, 8
    );

    context.drawImage(arrowsImage, 8, 0, 8, 8,
        x + width, y, 8, 8
    );

    context.globalAlpha = 1;
}

document.addEventListener('keydown', (event: KeyboardEvent) => {

    if (event.keyCode === 70) {
        FullscreenUtils.fullscreen(canvas);
    }

    if (event.keyCode === 37) {
        if (state === 2) {
            tetris.moveLeft();
        }
        if (state === 1) {
            gameTypeOptions.previous();
        }
    }

    if (event.keyCode === 39) {
        if (state === 2) {
            tetris.moveRight();
        }
        if (state === 1) {
            gameTypeOptions.next();
        }
    }

    if (event.keyCode === 38) {
        if (state === 2) {
            tetris.rotateClockwise();
        }
        if (state === 1) {
            musicTypeOptions.previous();
        }
    }

    // rotate counter clockwhise: y
    if (event.keyCode === 89) {
        if (state === 2) {
            tetris.rotateCounterclockwise();
        }
    }

    if (event.keyCode === 83) {
        if (state === 1) {
            tetris.start();
        }

        if (state === 0 || state === 1) {
            if (state === 0 ) {
                musicTypeOptions.triggerCallback();
             }
            state++;
        }
    }

    // soft drop: arrow down
    if (event.keyCode === 40) {
        // FIXME: remove this side effect code
        // maybe use const fps with num of frames for timing?
        if (state === 2) {
            tetris.nextDropTime = Date.now();
            tetris.moveDown();
        }

        if (state === 1) {
            musicTypeOptions.next();
        }
    }

    // hard drop: space
    if (event.keyCode === 32) {
        if (state === 2) {
            tetris.hardDrop();
        }
    }

});
