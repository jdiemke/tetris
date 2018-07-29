import { Playfield } from './Playfield';
import { Shape } from './Shape';

import Tiles from './assets/sprites.png';
import { ShapeSpawner } from './ShapeSpawner';
import { Sound } from './sound/Sound';
import { SoundManager } from './sound/SoundManager';

import rotate from './assets/block-rotate.mp3';
import removalSound from './assets/line-removal.mp3';
import dropSound from './assets/slow-hit.mp3';

import { Gamepad2 } from './Gamepad';


export class TetrisGame {

    public score: number = 0;

    public level: number = 0;
    public lineCounter: number = 0;

    private startLevel: number = 0;

    private rotatePressed: boolean = false;
    private inputElapsedTime = Date.now();

    private field: Playfield;
    private shape: Shape;
    private futureShape: Shape;
    private context: CanvasRenderingContext2D;

    private width: number = 640;
    private height: number = 360;

    private elapsedTime: number = Date.now();
    private soundManager: SoundManager = new SoundManager();
    private image: HTMLImageElement;

    private gamepad: Gamepad2 = new Gamepad2();

    constructor(context: CanvasRenderingContext2D) {
        this.soundManager.loadSound(Sound.DROP, dropSound);
        this.soundManager.loadSound(Sound.REMOVE_ROWS, removalSound);
        this.soundManager.loadSound(Sound.ROTATION, rotate);

        this.context = context;
        this.image = new Image();
        this.image.onload = () => {
            this.shape = new ShapeSpawner().getNextShape(this.image);
            this.futureShape = new ShapeSpawner().getNextShape(this.image);
            this.field = new Playfield(10, 20, this.image);
        };
        this.image.src = Tiles;
    }

    public update(): void {
        if (this.gamepad.isButtonPressed(0) && !this.rotatePressed) {
            this.rotatePressed = true;
            this.rotateClockwise();
        }

        if (!this.gamepad.isButtonPressed(0)) {
            this.rotatePressed = false;
        }

        if (Date.now() > this.inputElapsedTime + 100) {

            if (this.gamepad.isLeft(0, -1)) {
                this.moveLeft();
            }

            if (this.gamepad.isLeft(0, 1)) {
                this.moveRight();
            }

            if (this.gamepad.isLeft(1, 1)) {
                this.moveDown();
            }

            this.inputElapsedTime = Date.now();
        }

        if (this.shape !== null) {
            if (Date.now() > this.elapsedTime + this.getTetrominoSpeedInMillis(this.level)) {
                this.moveDown();
                this.elapsedTime = Date.now();
            }
        }
    }

    public getField(): Playfield {
        return this.field;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public getFuture(): Shape {
        return this.futureShape;
    }

    public getGhost(): Shape {
        const ghost = new Shape(this.shape.tiles, this.image, 9);
        ghost.position.y = this.shape.position.y;
        ghost.position.x = this.shape.position.x;
        do {
            ghost.position.y += 1;
        } while (!this.field.collides(ghost));

        ghost.position.y -= 1;

        return ghost;
    }

    public moveLeft(): void {
        this.shape.position.x -= 1;
        if (this.field.collides(this.shape)) {
            this.shape.position.x += 1;
        }
    }

    public moveRight(): void {
        this.shape.position.x += 1;
        if (this.field.collides(this.shape)) {
            this.shape.position.x -= 1;
        }
    }

    public rotateCounterclockwise(): void {
        const oldTiles = this.shape.tiles;
        this.shape.rotate();
        this.shape.rotate();
        this.shape.rotate();
        if (this.field.collides(this.shape)) {
            this.shape.tiles = oldTiles;
        } else {
            this.soundManager.play(Sound.ROTATION);
        }
    }

    public rotateClockwise(): void {
        const oldTiles = this.shape.tiles;
        this.shape.rotate();
        if (this.field.collides(this.shape)) {
            this.shape.tiles = oldTiles;
        } else {
            this.soundManager.play(Sound.ROTATION);
        }
    }

    public moveDown(): void {
        this.shape.position.y += 1;
        if (this.field.collides(this.shape)) {
            this.soundManager.play(Sound.DROP);
            this.shape.position.y -= 1;
            this.field.setBlocks(this.shape);
            this.shape = this.futureShape;
            this.futureShape = new ShapeSpawner().getNextShape(this.image);
            if (this.field.hasFullRows()) {
                const fullRows: number = this.field.getNumberOfFullRows();
                this.updateScore(this.level, fullRows);
                this.field.removeFullRows();
                this.soundManager.play(Sound.REMOVE_ROWS);
                this.lineCounter += fullRows;

                const firstLevelStep: number =
                    Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));
                this.level = Math.floor(Math.max(this.lineCounter - firstLevelStep, 0) / 10) +
                    (this.lineCounter >= firstLevelStep ? 1 : 0);
            }
        }
    }

    public hardDrop(): void {
        do {
            this.shape.position.y += 1;
        } while (!this.field.collides(this.shape));

        this.soundManager.play(Sound.DROP);
        this.shape.position.y -= 1;
        this.field.setBlocks(this.shape);
        this.shape = this.futureShape;
        this.futureShape = new ShapeSpawner().getNextShape(this.image);
        if (this.field.hasFullRows()) {
            const fullRows: number = this.field.getNumberOfFullRows();
            this.updateScore(this.level, fullRows);
            this.field.removeFullRows();
            this.soundManager.play(Sound.REMOVE_ROWS);
            this.lineCounter += fullRows;
            const firstLevelStep: number =
                Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));
            this.level = Math.floor(Math.max(this.lineCounter - firstLevelStep, 0) / 10) +
                (this.lineCounter >= firstLevelStep ? 1 : 0);
        }
    }

    // uses original nintendo scoring system used in NES, GB and SNES versions
    private updateScore(currentLevel: number, numLines: number): void {

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

        this.score += lineScore * (currentLevel + 1);
    }

    private getTetrominoSpeedInMillis(currentLevel: number): number {
        return this.convertFrameToMilliseconds(this.convertLevelToFramesPerGridCell(currentLevel));
    }

    private convertFrameToMilliseconds(frames: number): number {
        const NES_FPS: number = 60.098814;
        return 1000 / NES_FPS * frames;
    }

    private convertLevelToFramesPerGridCell(currentLevel: number): number {
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

}
