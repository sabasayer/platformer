import {
  Dimension,
  Position,
  GameObject,
  EnumObjectState,
} from "../game-object/game-object";
import { KeyboardHelper, EnumKeyboardKey } from "../input/keyboard.input";

export class Player extends GameObject {
  velocityX: number = 0;
  speed: number = 15;
  jumpForce: number = 40;
  canMoveAtAir: boolean = false;

  constructor(
    initialPosition: Position,
    dimension: Dimension,
    imageUrl?: string,
    canMoveAtAir: boolean = false
  ) {
    super(initialPosition, dimension, imageUrl, true);
    this.canMoveAtAir = canMoveAtAir;
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

  render() {
    super.render();
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
    if (this.canMoveAtAir || this.velocityY == 0) this.velocityX = this.speed;
  }

  moveLeft() {
    //disables airmove
    if (this.canMoveAtAir || this.velocityY == 0) this.velocityX = -this.speed;
  }
}
