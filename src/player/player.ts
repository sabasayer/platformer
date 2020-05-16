import {
    Dimension,
    Position,
    GameObject,
    EnumObjectState,
} from "../game-object/game-object";
import { KeyboardHelper, EnumKeyboardKey } from "../input/keyboard.input";
import { SpriteStore } from "src/sprite/sprite-store.interface";

export class Player extends GameObject {
    velocityX: number = 0;
    speed: number = 15;
    jumpForce: number = 50;
    canMoveAtAir: boolean = false;

    constructor(options: {
        initialPosition: Position;
        dimension: Dimension;
        imageUrl?: string;
        spriteStore?: SpriteStore;
        canMoveAtAir: boolean;
        isCollidable?: boolean;
        gravityHasEffectOnIt?: boolean;
    }) {
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
