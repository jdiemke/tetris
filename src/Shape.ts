import { Position } from './Position';

export class Shape {

    public position: Position = new Position(3, 0);
    public tiles: Array<Array<number>>;
    public spriteId: number;

    public constructor(tiles: Array<Array<number>>, private image: HTMLImageElement, sprite: number = 2) {
        this.tiles = tiles;
        this.spriteId = sprite;
    }

    public draw(context: CanvasRenderingContext2D): void {
        for (let y: number = 0; y < this.tiles.length; y++) {
            for (let x: number = 0; x < this.tiles[y].length; x++) {
                const num: number = this.tiles[y][x];
                if (num === 1) {
                    context.drawImage(this.image, 16 * this.spriteId, 0, 16, 16,
                        this.position.x * 16 + x * 16, this.position.y * 16 + y * 16, 16, 16
                    );
                }
            }
        }
    }

    public drawAt(context: CanvasRenderingContext2D, pos: Position): void {
        for (let y: number = 0; y < this.tiles.length; y++) {
            for (let x: number = 0; x < this.tiles[y].length; x++) {
                const num: number = this.tiles[y][x];
                if (num === 1) {
                    context.drawImage(this.image, 16 * this.spriteId, 0, 16, 16,
                        pos.x + x * 16, pos.y  + y * 16, 16, 16
                    );
                }
            }
        }
    }


    public rotate(): void {
        const temp: Array<Array<number>> = new Array<Array<number>>(this.tiles[0].length);
        for (let i = 0; i < this.tiles[0].length; i++) {
            const arr = new Array<number>(this.tiles.length);
            arr.fill(0);
            temp[i] = arr;
        }

        for (let y: number = 0; y < this.tiles.length; y++) {
            for (let x: number = 0; x < this.tiles[y].length; x++) {
                temp[x][this.tiles.length - 1 - y] = this.tiles[y][x];
            }
        }

        this.tiles = temp;
    }

    public getTiles(): Array<Position> {
        const tiles = Array<Position>();
        for (let y: number = 0; y < this.tiles.length; y++) {
            for (let x: number = 0; x < this.tiles[y].length; x++) {
                const num: number = this.tiles[y][x];

                if (num === 1) {
                    tiles.push(new Position(x + this.position.x, y + this.position.y));
                }
            }
        }
        return tiles;
    }

}
