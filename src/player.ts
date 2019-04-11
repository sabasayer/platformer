import { Dimension, Position, Object, EnumObjectState } from "./object";
import { KeyboardHelper, EnumKeyboardKey } from "./keyboard.input";

export class Player extends Object {
  velocityX: number = 0;
  speed: number = 15;
  jumpForce: number = 40;
  airMove: boolean = false;
  constructor(initialPosition: Position, dimension: Dimension) {
    super(initialPosition, dimension, true);
    this.handleKeyboardEvents();
  }

  handleKeyboardEvents() {
    window.addEventListener("keydown", ev => {
      KeyboardHelper.keyDown(ev);
    });

    window.addEventListener("keyup", ev => {
      KeyboardHelper.keyUp(ev);
    });
  }

  render() {
    if (KeyboardHelper.keys[EnumKeyboardKey.SPACE]) this.jump();

    if (KeyboardHelper.keys[EnumKeyboardKey.RIGHT]) this.moveRight();
    else if (KeyboardHelper.keys[EnumKeyboardKey.LEFT]) this.moveLeft();
    else {
      //stops if left or right not pressing and if not is in the air
      if (this.velocityY == 0) {
        this.velocityX = 0;
      }
    }

    super.render();
  }

  jump() {
    if (this.velocityY == 0) {
      this.velocityY = -this.jumpForce;
    }
  }

  moveRight() {
    //disables airmove
    if (this.airMove || this.velocityY == 0) this.velocityX = this.speed;
  }

  moveLeft() {
    //disables airmove
    if (this.airMove || this.velocityY == 0) this.velocityX = -this.speed;
  }
}
