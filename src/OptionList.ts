/**
 * OptionList
 *
 * @export
 * @class OptionList
 * @template T
 */
export class OptionList<T> {

    private options: Array<T>;
    private index: number;
    private callback: (value: T) => void;

    public constructor(options: Array<T>, defaultIndex: number = 0, private rotate: boolean = false) {
        this.options = options;
        this.index = defaultIndex;
    }

    public triggerCallback(): void {
        this.callback(this.options[this.index]);
    }

    public addChangeListener(callback: (value: T) => void): void {
        this.callback = callback;
    }

    public getOption(): T {
        return this.options[this.index];
    }

    public getOptions(): Array<T> {
        return this.options;
    }

    public getIndex(): number {
        return this.index;
    }

    public next(): void {
        const previousIndex: number = this.index;
        if (this.rotate) {
            this.index = (this.index + 1) % this.options.length;
        } else {
            this.index = Math.min(this.index + 1, this.options.length - 1);
        }

        if (this.callback && this.index !== previousIndex) {
            this.callback(this.options[this.index]);
        }
    }

    public previous(): void {
        const previousIndex: number = this.index;
        if (this.rotate) {
            this.index = (this.index - 1 + this.options.length) % this.options.length;
        } else {
            this.index = Math.max(this.index - 1, 0);
        }
        if (this.callback && this.index !== previousIndex) {
            this.callback(this.options[this.index]);
        }
    }

}
