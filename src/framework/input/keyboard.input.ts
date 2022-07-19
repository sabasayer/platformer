export enum EnumKeyboardKey {
    SPACE = 32,
    UP = 38,
    LEFT = 37,
    RIGHT = 39,
    DOWN = 40,
    X = 88,
    ESCAPE = 27,
}

export abstract class KeyboardHelper {
    static keys: { [keyCode: number]: boolean } = {};

    static keyDown(ev: KeyboardEvent) {
        if (EnumKeyboardKey[ev.which]) {
            ev.preventDefault();
            this.keys[ev.which] = true;
        }
    }
    static keyUp(ev: KeyboardEvent) {
        if (EnumKeyboardKey[ev.which]) {
            this.keys[ev.which] = false;
        }
    }

    static reset() {
        this.keys = {};
    }
}
