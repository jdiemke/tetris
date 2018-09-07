export class SpriteMapper {

    private spriteMap: Array<Array<number>> = [
        [0, 1, 2, 0, 1, 2, 0], // level 0
        [3, 4, 5, 3, 4, 5, 3], // level 1
        [6, 7, 8, 6, 7, 8, 6], // level 2
        [0, 1, 9, 0, 1, 9, 0], // level 3
        [10, 11, 12, 10, 11, 12, 10], // level 4
        [13, 12, 14, 13, 12, 14, 13], // level 5
        [15, 16, 17, 15, 16, 17, 15], // level 6
        [18, 19, 20, 18, 19, 20, 18], // level 7
        [0, 1, 16, 0, 1, 16, 0], // level 8
        [15, 16, 21, 15, 16, 21, 15], // level 8
    ];

    constructor(private level: () => number) {

    }

    public getSprite(tetrominoSpriteKey: number): number {
        const level: number = Math.min(this.level(), this.spriteMap.length - 1);
        return this.spriteMap[level][tetrominoSpriteKey - 1];
    }

}
