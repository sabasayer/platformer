import {
    Dimension,
    Position,
    GameObject,
    EnumObjectState,
} from "../game-object/game-object";
import { KeyboardHelper, EnumKeyboardKey } from "../input/keyboard.input";
import { SpriteStore } from "src/sprite/sprite-store.interface";
import { PlayerOptions } from "./player.options";

export class Player extends GameObject {
    protected velocityX: number = 0;
    private speed: number = 15;
    private jumpForce: number = 50;
    private canMoveAtAir: boolean = false;
    protected health:number = 100

    constructor(options: PlayerOptions) {
        super(options);
        this.canMoveAtAir = options.canMoveAtAir;
        this.handleKeyboardEvents();
    }

    handleKeyboardEvents() {
        window.addEventListener("keydown", (ev) => {
            KeyboardHelper.keyDown(ev);
            this.checkKeyboardInputs();
        });

        window.addEventListener("keyup", (ev) => {
            KeyboardHelper.keyUp(ev);
            this.checkKeyboardInputs();
        });
    }

    render(frame:number) {
        super.render(frame);
    }

    checkKeyboardInputs() {
        if (KeyboardHelper.keys[EnumKeyboardKey.SPACE]) this.jump();

        if (KeyboardHelper.keys[EnumKeyboardKey.RIGHT]) this.moveRight();
        else if (KeyboardHelper.keys[EnumKeyboardKey.LEFT]) this.moveLeft();
        else {
            //stops if left or right not pressing and if not is in the air
            if (this.canMoveAtAir || this.velocityY == 0) {
                this.velocityX = 0;
            }
        }
    }

    jump() {
        if (this.velocityY == 0) {
            this.velocityY = -this.jumpForce;
        }
    }

    moveRight() {
        //disables airmove
        if (this.canMoveAtAir || this.velocityY == 0)
            this.velocityX = this.speed;
    }

    moveLeft() {
        //disables airmove
        if (this.canMoveAtAir || this.velocityY == 0)
            this.velocityX = -this.speed;
    }
}
