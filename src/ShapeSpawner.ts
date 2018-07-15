import { Shape } from './Shape';

export class ShapeSpawner {

    public getNextShape(image: HTMLImageElement): Shape {
        const random: number = Math.floor(Math.random() * 4);

        // TODO: put into Array to slect by index
        switch (random) {
            case 0:
                return new Shape([
                    0, 0, 0, 0,
                    0, 1, 1, 0,
                    0, 1, 1, 0,
                    0, 0, 0, 0
                ], image);
            case 1:
                return new Shape([
                    0, 0, 1, 0,
                    0, 1, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 0
                ], image);
            case 2:
                return new Shape([
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0
                ], image);
            case 3:
                return new Shape([
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                    0, 1, 1, 0,
                    0, 0, 0, 0
                ], image);
        }
    }

}
