export class Gamepad2 {

    private gamepad: Gamepad;

    constructor() {
        window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
            console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);

            this.gamepad = e.gamepad;
        });
    }

    public isButtonPressed(index: number): boolean {
        if (this.gamepad) {
            return this.gamepad.buttons[index].pressed;
        }

        return false;
    }

    public isLeft(axis: number, value: number): boolean {
        if (this.gamepad) {
            return this.gamepad.axes[axis] === value;
        }

        return false;
    }

}
