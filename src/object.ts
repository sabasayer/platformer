import { World } from "./world";
import { frameRate } from "./constants";

export interface Position {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface BoundingBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export enum EnumObjectState {
  idle = 1,
  moving = 2,
  falling = 3,
  jumping = 4
}

export class Object {
  id: number = Math.random();
  protected position: Position;
  protected dimension: Dimension;
  velocityY: number = 0;
  velocityX: number = 0;
  accelarationX: number = 1;
  accelarationY: number = 1;
  /**Collides with other solid objects and world boundaries */
  isSolid: boolean = false;
  gravityHasEffectOnIt: boolean = true;

  protected state: EnumObjectState = EnumObjectState.idle;

  constructor(
    initialPosition: Position,
    dimension: Dimension,
    isSolid?: boolean
  ) {
    this.position = initialPosition;
    this.isSolid = isSolid;
    this.dimension = dimension;
    World.registerObject(this);
  }

  getBoundingBox(): BoundingBox {
    return {
      left: this.position.x,
      right: this.position.x + this.dimension.width,
      top: this.position.y,
      bottom: this.position.y + this.dimension.height
    };
  }

  render() {
    this.state = EnumObjectState.idle;
    if (this.gravityHasEffectOnIt) this.fall();
    this.moveY(this.velocityY * frameRate * 10);
    this.moveX(this.velocityX * frameRate * 10);

    World.ctx.fillStyle = "red";
    World.ctx.fillText(
      EnumObjectState[this.state],
      this.position.x,
      this.position.y - 10
    );

    World.ctx.fillStyle = "orange";
    World.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  }

  //TODO: set moving state
  //TODO: check collision on world object
  moveX(amount: number) {
    this.position.x += amount;

    if (this.isSolid) {
      let collision = World.collidesWithWorldBoundaries(this);
      if (collision.x || World.detectCollision(this)) {
        this.position.x -= amount;
        this.velocityX = 0;
      }
    }
  }

  moveY(amount: number) {
    this.position.y += amount;

    if (this.isSolid) {
      let collision = World.collidesWithWorldBoundaries(this);
      if (collision.y || World.detectCollision(this)) {
        this.position.y -= amount;
        this.velocityY = 0;
      }
    }
  }

  fall() {
    this.velocityY += World.gravity * frameRate * 10;
  }
}
