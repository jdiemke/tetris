/**
 * TODO:
 * - bug: hard drop during erase animation retriggers animation!
 * - bug: soft drop / hard drop does not stop after collision (next tetromino also drops immediately)
 * - a type congratulations screen
 * - different colors per level
 * - Add state machine or state class!
 * - Remove render code and move into render class
 * - Asset preloader
 * - colored fonts: https://github.com/geoffb/canvas-bitmap-fonts/blob/master/index.html
 */
import rotate from './assets/block-rotate.mp3';
import removalSound from './assets/line-removal.mp3';
import menSound from './assets/menuS.wav';

import dropSound from './assets/drop.ogg';

import arrows from './assets/arrows.png';
import background from './assets/background.png';
import congrats from './assets/congratulations.png';
import credits from './assets/credits.png';
import digits2 from './assets/digits-red.png';
import digits from './assets/digits.png';
import font2 from './assets/font2.png';
import menu2 from './assets/main-menu.png';
import menuLevel from './assets/menu-level.png';
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
import { Sound } from './sound/Sound';

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

const fonts2Image = new Image();
fonts2Image.src = font2;

const creditsImage = new Image();
creditsImage.src = credits;

const congratsImage = new Image();
congratsImage.src = congrats;

const digits2Image = new Image();
digits2Image.src = digits2;

const arrowsImage = new Image();
arrowsImage.src = arrows;

const menuImage = new Image();
menuImage.src = menu;

const menuImage2 = new Image();
menuImage2.src = menu2;

const menuImage3 = new Image();
menuImage3.src = menuLevel;

let tetris: TetrisGame;

const sm = new SoundManager();
sm.loadSound(Sound.DROP, dropSound);
sm.loadSound(Sound.REMOVE_ROWS, removalSound);
sm.loadSound(Sound.ROTATION, rotate);
sm.loadSound(99, menSound);

declare function require(name: string);
let musicTypeOptions: OptionList<ArrayBuffer>;
let music: Array<ArrayBuffer> = [];

const imageSp = new Image();
imageSp.onload = () => {
    tetris = new TetrisGame(context, imageSp, sm);
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
const levelTypeOptions: OptionList<number> = new OptionList<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0);
const charOrder: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,/()". -';

const allChars = charOrder.split('');

let nameOption: OptionList<OptionList<string>> = null;

class HightScore {

    public name: string;
    public score: number;
    public level: number;

    constructor(name: string, score: number, level: number) {
        this.name = name;
        this.score = score;
        this.level = level;
    }

}

const highScoreList: Array<HightScore> = [
    new HightScore('JOHANN', 10000, 9),
    new HightScore('OTASAN', 7500, 5),
    new HightScore('LANCE ', 100, 0)
];
let hightScoreIndex: number = 0;

let highScore: HightScore = null;

function draw(): void {

    if (state === 0) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(creditsImage, 0, 0, 256, 224, 0, 0, 256, 224);
    } else if (state === 1) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage, 0, 0, 256, 224, 0, 0, 256, 224);
    } else if (state === 2) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage2, 0, 0, 256, 224, 0, 0, 256, 224);
        drawArrows(63 + gameTypeOptions.getOption() * 96, 55, 58);
        drawArrows(103, 135 + musicTypeOptions.getIndex() * 16, 74);
    } else if (state === 3) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(menuImage3, 0, 0, 256, 224, 0, 0, 256, 224);

        drawSelectedLevel();
    } else if (state === 5) {
        // enter name!
        //

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(congratsImage, 0, 0, 256, 224, 0, 0, 256, 224);
        // color of curso #ff9047

        const row = nameOption.getIndex();

        context.fillStyle = '#ff9047';
        const flicker: number = Math.floor(Date.now() * 0.01) % 2;

        if (flicker === 1) {
            context.globalAlpha = 0;
        } else {
            context.globalAlpha = 0.75;
        }

        context.fillRect(56 + 8 + 8 + row * 8, 152 + hightScoreIndex * 16, 8, 8);

        context.globalAlpha = 1;

        for (let i = 0; i < highScoreList.length; i++) {
            const entry: string = (i + 1).toString() + ' ' + highScoreList[i].name + ' '
                + pad(highScoreList[i].score.toString(), 6, '0') + ' ' + pad(highScoreList[i].level.toString(), 2, '0');
            drawText(56, 152 + i * 16, entry);
        }
    } else {
        context.setTransform(1, 0, 0, 1, 0, 0);

        context.fillStyle = '#222222';
        context.fillRect(0, 0, 640, 360);
        context.drawImage(image, 0, 0, 256, 224, 0, 0, 256, 224);

        if (tetris.state !== 2) {
            tetris.update();
        }

        context.setTransform(1, 0, 0, 1, 0, 0);

        tetris.getField().draw(context);

        const shape: Shape = tetris.getShape();
        if (shape !== null) {
            shape.draw(context);
        }

        if (tetris.state === 2) {
            drawDeath();
            context.setTransform(1, 0, 0, 1, 0, 0);

            context.fillStyle = '#000000';
            context.fillRect(8 * 12.5 - 4, 8 * 14 - 4, 8 * 10, 8 * 2);
            drawText(8 * 12.5, 8 * 14, 'GAME OVER');
        }

        context.globalAlpha = 0.24;
        tetris.getGhost().draw(context);
        context.globalAlpha = 1;

        drawNextShape();
        drawStatistics();
        if (tetris.state === 1) {
            drawRemoval();
        }
    }

    requestAnimationFrame(() => draw());
}

function drawSelectedLevel() {

    const column = levelTypeOptions.getIndex() % 5;
    const row = Math.floor(levelTypeOptions.getIndex() / 5);

    context.fillStyle = '#ffff00';
    const flicker: number = Math.floor(Date.now() * 0.02) % 2;

    if (flicker === 1) {
        context.globalAlpha = 0;
    } else {
        context.globalAlpha = 0.75;
    }

    context.fillRect(column * 16 + 52, row * 16 + 76, 16, 16);

    context.globalAlpha = 1;

    for (let i = 0; i < 10; i++) {
        drawText(56 + (i % 5) * 16, 80 + Math.floor(i / 5) * 16, i.toString());
    }

    for (let i = 0; i < highScoreList.length; i++) {
        const entry: string = (i + 1).toString() + ' ' + highScoreList[i].name + ' '
            + pad(highScoreList[i].score.toString(), 6, '0') + ' ' + pad(highScoreList[i].level.toString(), 2, '0');
        drawText(56, 152 + i * 16, entry);
    }
}

function drawRemoval(): void {
    context.translate(96, 40);
    const scale = (Date.now() - tetris.oldDropTime) / TetrisGame.FULL_ROW_ANIMATION_DELAY;

    const time = Math.floor(Math.max(0, Math.min(5.0, 6 * scale)));
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

function drawDeath(): void {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(96, 40);
    const scale: number = 0.0006;
    const diff = Math.min(Math.max((Date.now() - tetris.deathTime) * scale, 0), 1);

    for (let y: number = 0; y < Math.floor(20 * diff); y++) {
        for (let x: number = 0; x < 10; x++) {
            context.drawImage(imageSp, 5 * 8, 0, 8, 8, x * 8, y * 8, 8, 8);
        }
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

function drawText(x: number, y: number, text: string): void {
    const img: HTMLImageElement = fonts2Image;
    for (let i: number = 0; i < text.length; i++) {
        drawChar(x + i * 8, y, text.charCodeAt(i), img);
    }
}

function drawChar(x: number, y: number, char: number, img: HTMLImageElement): void {
    const index: number = char - ' '.charCodeAt(0);
    const yIndex = Math.floor(index / 32);
    const xIndex = Math.floor(index % 32);
    context.drawImage(img, 8 * xIndex, 8 * yIndex, 8, 8,
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

const KEY_DOWN_EVENT_LISTENER: string = 'keydown';

document.addEventListener(KEY_DOWN_EVENT_LISTENER, (event: KeyboardEvent) => {

    if (event.keyCode === 70) {
        FullscreenUtils.fullscreen(canvas);
    }

    if (event.keyCode === 37) {
        if (state === 4) {
            tetris.moveLeft();
        }
        if (state === 2) {
            gameTypeOptions.previous();
            sm.play(99);
        }

        if (state === 3) {
            levelTypeOptions.previous();
            sm.play(99);
        }

        if (state === 5) {
            nameOption.previous();
        }
    }

    if (event.keyCode === 39) {
        if (state === 4) {
            tetris.moveRight();
        }
        if (state === 2) {
            gameTypeOptions.next();
            sm.play(99);
        }
        if (state === 3) {
            levelTypeOptions.next();
            sm.play(99);
        }
        if (state === 5) {
            nameOption.next();
        }
    }

    if (event.keyCode === 38) {
        if (state === 4) {
            tetris.rotateClockwise();
        }
        if (state === 2) {
            musicTypeOptions.previous();
            sm.play(99);
        }

        if (state === 5) {
            nameOption.getOption().next();
            const options: Array<OptionList<string>> = nameOption.getOptions();

            let newName: string = '';
            for (let i = 0; i < options.length; i++) {
                newName += options[i].getOption();
            }
            highScore.name = newName;
        }
    }

    // rotate counter clockwhise: y
    if (event.keyCode === 89) {
        if (state === 4) {
            tetris.rotateCounterclockwise();
        }
    }

    if (event.keyCode === 83) {
        if (state === 3) {
            tetris.setStartLevel(levelTypeOptions.getIndex());
            tetris.start();
        }

        if (state === 0 || state === 1 || state === 2 || state === 3) {
            if (state === 1) {
                musicTypeOptions.triggerCallback();
            }
            state++;
        } else if (state === 4 && tetris.state === 2) {
            XMPlayer.stop();
            if (tetris.score > highScoreList[2].score) {
                const charOptions1: OptionList<string> = new OptionList(allChars, allChars.length - 1, true);
                const charOptions2: OptionList<string> = new OptionList(allChars, allChars.length - 1, true);
                const charOptions3: OptionList<string> = new OptionList(allChars, allChars.length - 1, true);
                const charOptions4: OptionList<string> = new OptionList(allChars, allChars.length - 1, true);
                const charOptions5: OptionList<string> = new OptionList(allChars, allChars.length - 1, true);
                const charOptions6: OptionList<string> = new OptionList(allChars, allChars.length - 1, true);
                nameOption = new OptionList(
                    [
                        charOptions1,
                        charOptions2,
                        charOptions3,
                        charOptions4,
                        charOptions5,
                        charOptions6
                    ], 0
                );

                for (let i = 0; i < highScoreList.length; i++) {
                    if (highScoreList[i].score < tetris.score) {
                        highScore = highScoreList[i];
                        hightScoreIndex = i;
                        break;
                    }
                }
                highScore.score = tetris.score;
                highScore.level = tetris.level;
                highScore.name = '------';
                state = 5;
            } else {
                tetris = new TetrisGame(context, imageSp, sm);
                state = 0;
            }
        } else if (state === 5) {
            tetris = new TetrisGame(context, imageSp, sm);
            state = 0;
        }
    }

    // soft drop: arrow down
    if (event.keyCode === 40) {
        if (state === 4) {
            // FIXME: remove this side effect code
            // maybe use const fps with num of frames for timing?
            tetris.nextDropTime = Date.now();
            tetris.moveDown();
        }

        if (state === 2) {
            musicTypeOptions.next();
            sm.play(99);
        }

        if (state === 5) {
            nameOption.getOption().previous();
            const options: Array<OptionList<string>> = nameOption.getOptions();

            let newName: string = '';
            for (let i = 0; i < options.length; i++) {
                newName += options[i].getOption();
            }
            highScore.name = newName;
        }
    }

    // hard drop: space
    if (event.keyCode === 32) {
        if (state === 4) {
            tetris.hardDrop();
        }
    }

});
