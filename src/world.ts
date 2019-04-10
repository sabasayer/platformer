import { Object } from "./object";

abstract class World {
  static width: number = 640;
  static height: number = 480;
  static gravity: number = 3.4;
  static ctx: CanvasRenderingContext2D;
  static canvas: HTMLCanvasElement;
  private static worldObjects: Object[] = [];
  static initialize() {
    if (this.canvas) return;
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }

  static render() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  static collidesWithWorldBoundaries(object: Object) {
    let collisions: { [key: string]: boolean } = {};
    let boundingBox = object.getBoundingBox();
    if (boundingBox.right >= World.width) collisions.x = true;

    if (boundingBox.left <= 0) collisions.x = true;

    if (boundingBox.top <= 0) collisions.y = true;

    if (boundingBox.bottom >= World.height) collisions.y = true;

    return collisions;
  }

  static collidesWithObject(object: Object, secondObject: Object) {
    let boundingBox = object.getBoundingBox();
    let boundingBoxSecond = secondObject.getBoundingBox();

    if (
      (boundingBox.left - boundingBoxSecond.right) *
        (boundingBox.right - boundingBoxSecond.left) <=
        0 &&
      (boundingBox.top - boundingBoxSecond.bottom) *
        (boundingBox.bottom - boundingBoxSecond.top) <=
        0
    )
      return true;

    return false;
  }

  static registerObject(object: Object) {
    this.worldObjects.push(object);
  }

  static detectCollision(object: Object) {
    let collision: boolean = false;
    this.worldObjects.forEach(e => {
      if (e.id != object.id) {
        if (this.collidesWithObject(object, e)) {
          collision = true;
        }
      }
    });

    return collision;
  }
}

World.initialize();
export { World };
