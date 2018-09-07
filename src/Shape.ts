import { Position } from './Position';
import { ShapeType } from './ShapeType';
import { SpriteMapper } from './SpriteMapper';

export class Shape {

    public position: Position = new Position(3, 0);
    public tiles: Array<Array<number>>;
    public spriteId: number;

    public constructor(tiles: Array<Array<number>>, private image: HTMLImageElement,
                       sprite: number = 2, public type: ShapeType, private spriteMapping: SpriteMapper) {
        this.tiles = tiles;
        this.spriteId = sprite;
    }

    public draw(context: CanvasRenderingContext2D): void {
        for (let y: number = 0; y < this.tiles.length; y++) {
            for (let x: number = 0; x < this.tiles[y].length; x++) {
                const num: number = this.tiles[y][x];
                if (num === 1) {
                    context.drawImage(this.image, 8 * this.spriteMapping.getSprite(this.spriteId), 0, 8, 8,
                        this.position.x * 8 + x * 8, this.position.y * 8 + y * 8, 8, 8
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
                    context.drawImage(this.image, 8 * this.spriteMapping.getSprite(this.spriteId), 0, 8, 8,
                        pos.x + x * 8, pos.y + y * 8, 8, 8
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
