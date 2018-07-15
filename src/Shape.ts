import { Position } from './Position';

export class Shape {

    public position: Position = new Position(3, 0);
    public width: number = 4;
    public height: number = 4;
    private tiles: Array<number>;

    public constructor(tiles: Array<number>, private image: HTMLImageElement) {
        this.tiles = tiles;
    }

    public draw(context: CanvasRenderingContext2D): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                const num: number = this.tiles[x + y * this.width];
                if (num === 1) {
                    context.drawImage(this.image, 0, 0, 16, 16,
                        this.position.x * 16 + x * 16, this.position.y * 16 + y * 16, 16, 16
                    );
                }
            }
        }
    }

    public rotate(): void {
        const temp: Array<number> = Array<number>(this.tiles.length);

        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                temp[x + (this.height - 1 - y) * this.width] = this.tiles[y + x * this.width];
            }
        }

        this.tiles = temp;
    }

    public getTiles(): Array<Position> {
        const tiles = Array<Position>();
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                const num: number = this.tiles[x + y * this.width];

                if (num === 1) {
                    tiles.push(new Position(x + this.position.x, y + this.position.y));
                }
            }
        }
        return tiles;
    }

}
