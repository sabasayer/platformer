import { Dimension, Position, Object } from "./object";
import { KeyboardHelper, EnumKeyboardKey } from "./keyboard.input";

export class Player extends Object {
  velocityX: number = 0;
  speed: number = 15;
  jumpForce: number = 30;
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
    super.render();

    if (KeyboardHelper.keys[EnumKeyboardKey.SPACE]) this.jump();

    if (KeyboardHelper.keys[EnumKeyboardKey.RIGHT]) this.moveRight();
    else if (KeyboardHelper.keys[EnumKeyboardKey.LEFT]) this.moveLeft();
    else {
      if (this.velocityY == 0) this.velocityX = 0;
    }
  }

  jump() {
    if (this.velocityY == 0) this.velocityY = -this.jumpForce;
  }

  moveRight() {
    if (this.velocityY == 0) this.velocityX = this.speed;
  }

  moveLeft() {
    if (this.velocityY == 0) this.velocityX = -this.speed;
  }
}
