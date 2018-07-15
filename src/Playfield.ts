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
        this.field[0] = 1;
    }

    public removeFullRow(row: number): void {
        let fullRow: boolean = true;

        for (let x: number = 0; x < this.width; x++) {
            if (this.field[x + row * this.width] === 0) {
                fullRow = false;
                break;
            }
        }

        if (fullRow) {
            for (let x: number = 0; x < this.width; x++) {
                this.field[x + row * this.width] = 0;
            }
        }
    }

    public removeFullRows(): void {
        for (let y: number = 0; y < this.height; y++) {
            this.removeFullRow(y);
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                const num: number = this.field[x + y * this.width];
                if (num === 1) {
                    context.drawImage(this.image,
                        16,
                        0,
                        16,
                        16,
                        x * 16,
                        y * 16,
                        16,
                        16
                    );
                }
            }
        }
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

            this.set(tile.x, tile.y);
        }

        return false;
    }

    public isSet(x: number, y: number): boolean {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return true;
        }
        return this.field[x + y * this.width] === 1;
    }

    public set(x: number, y: number): void {
        this.field[x + y * this.width] = 1;
    }

}
