import { Shape } from './Shape';
import { ShapeType } from './ShapeType';
import { SpriteMapper } from './SpriteMapper';

export class ShapeSpawner {

    constructor(private spriteMapping: SpriteMapper) {

    }

    public getNextShape(image: HTMLImageElement): Shape {
        const random: number = Math.floor(Math.random() * 7);

        // TODO: put into Array to slect by index
        switch (random) {
            case 0:
                return new Shape([
                    [1, 1],
                    [1, 1],
                ], image, 4, ShapeType.O, this.spriteMapping);
            case 1:
                return new Shape([
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ], image, 1, ShapeType.T,  this.spriteMapping);
            case 2:
                return new Shape([
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ], image, 7, ShapeType.I,  this.spriteMapping);
            case 3:
                return new Shape([
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ], image, 2, ShapeType.J,  this.spriteMapping);
            case 4:
                return new Shape([
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0]
                ], image, 6, ShapeType.L,  this.spriteMapping);
            case 5:
                return new Shape([
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ], image, 5, ShapeType.S,  this.spriteMapping);
            case 6:
                return new Shape([
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ], image, 3, ShapeType.Z,  this.spriteMapping);
        }
    }

}
