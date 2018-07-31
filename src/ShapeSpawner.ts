import { Shape } from './Shape';
import { ShapeType } from './ShapeType';

export class ShapeSpawner {

    public getNextShape(image: HTMLImageElement): Shape {
        const random: number = Math.floor(Math.random() * 7);

        // TODO: put into Array to slect by index
        switch (random) {
            case 0:
                return new Shape([
                    [1, 1],
                    [1, 1],
                ], image, 1, ShapeType.O);
            case 1:
                return new Shape([
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ], image, 2, ShapeType.T);
            case 2:
                return new Shape([
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ], image, 3, ShapeType.I);
            case 3:
                return new Shape([
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ], image, 4, ShapeType.J);
            case 4:
                return new Shape([
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0]
                ], image, 1, ShapeType.L);
            case 5:
                return new Shape([
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ], image, 2, ShapeType.S);
            case 6:
                return new Shape([
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ], image, 3, ShapeType.Z);
        }
    }

}
