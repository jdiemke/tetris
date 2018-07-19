import { Position } from './Position';
import { Shape } from './Shape';

/**
 * The playfield class
 */
export class Playfield {

    private field: Array<number>;

    public constructor(private width: number, private height: number, private image: HTMLImageElement) {
        this.width = width;
        this.height = height;
        this.field = new Array<number>(width * height);
        this.field.fill(0);
    }

    public isFullRow(row: number): boolean {
        let fullRow: boolean = true;

        for (let x: number = 0; x < this.width; x++) {
            if (this.field[x + row * this.width] === 0) {
                fullRow = false;
                break;
            }
        }
        return fullRow;
    }

    public removeFullRows(): boolean {
        let removal = false;
        for (let y: number = 0; y < this.height; y++) {
            if (this.isFullRow(y)) {
                this.field.splice(y * 10, 10);
                this.field.unshift(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                removal = true;
            }
        }
        return removal;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.translate(640 / 2 - (12 * 16) / 2, 12);

        for (let y: number = 0; y < this.height + 1; y++) {
            for (let x: number = 0; x < this.width + 2; x++) {
                this.drawSprite(context, x, y, 0);
            }
        }

        context.translate(16, 0);

        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                const num: number = this.field[x + y * this.width];
                if (num !== 0) {
                    this.drawSprite(context, x, y, num);
                } else {
                    this.drawSprite(context, x, y, 1);
                }
            }
        }
    }

    public drawSprite(context: CanvasRenderingContext2D, x: number, y: number, sprite: number): void {
        context.drawImage(this.image, 16 * sprite, 0, 16, 16, x * 16, y * 16, 16, 16);
    }

    public collides(shape: Shape): boolean {
        const tiles: Array<Position> = shape.getTiles();

        for (let i: number = 0; i < tiles.length; i++) {
            const tile: Position = tiles[i];

            if (this.isSet(tile.x, tile.y)) {
                return true;
            }
        }

        return false;
    }

    public setBlocks(shape: Shape): boolean {
        const tiles: Array<Position> = shape.getTiles();

        for (let i: number = 0; i < tiles.length; i++) {
            const tile: Position = tiles[i];

            this.set(tile.x, tile.y, shape.spriteId);
        }

        return false;
    }

    public isSet(x: number, y: number): boolean {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return true;
        }
        return this.field[x + y * this.width] !== 0;
    }

    public set(x: number, y: number, tileId: number = 1): void {
        this.field[x + y * this.width] = tileId;
    }

}
