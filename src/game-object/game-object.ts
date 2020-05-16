import { frameRate, framePerSecond } from "../constants";
import { World } from "../world/world";
import { Sprite } from "src/sprite/sprite";
import { SpriteStore } from "src/sprite/sprite-store.interface";
import { ImageUtils } from "../utils/image.utils";

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
    jumping = 4,
}

export class GameObject {
    id: number = Math.random();
    protected position: Position;
    protected dimension: Dimension;
    
    velocityY: number = 0;
    velocityX: number = 0;
    accelarationX: number = 1;
    accelarationY: number = 1;

    isCollidable: boolean = false;
    gravityHasEffectOnIt: boolean = true;
    imageUrl: string = "";
    image: HTMLImageElement;

    spriteStore: SpriteStore;

    protected state: EnumObjectState = EnumObjectState.idle;

    get calculatedPosition() {
        return {
            left: this.position.x,
            right: this.position.x + this.dimension.width,
            top: this.position.y,
            bottom: this.position.y + this.dimension.height,
        };
    }

    constructor(options: {
        initialPosition: Position;
        dimension: Dimension;
        imageUrl?: string;
        spriteStore?: SpriteStore;
        isCollidable?: boolean;
        gravityHasEffectOnIt?: boolean;
    }) {
        this.position = options.initialPosition;
        this.isCollidable = options.isCollidable;
        this.dimension = options.dimension;
        this.spriteStore = options.spriteStore;
        this.imageUrl = options.imageUrl;
        this.gravityHasEffectOnIt = options.gravityHasEffectOnIt ?? true;
        this.createImage();

        World.registerObject(this);
    }

    createImage() {
        if (!this.imageUrl) return;

        let image = new Image();
        image.src = this.imageUrl;
        image.onload = () => {
            this.image = image;
        };
    }

    getBoundingBox(): BoundingBox {
        return {
            left: this.position.x,
            right: this.position.x + this.dimension.width,
            top: this.position.y,
            bottom: this.position.y + this.dimension.height,
        };
    }

    beforeRender() {
        this.move();
    }

    render(frame: number) {
        this.beforeRender();

        this.renderDebugInfo();
        this.renderTempBody(frame);
        this.renderBoundingBox();

        this.afterRender();
    }

    afterRender() {
        this.setState();
    }

    private renderTempBody(frame: number) {
        if (this.spriteStore && this.renderSprite(frame)) {
            return;
        }

        if (this.image) {
            this.renderImage(this.image);
            return;
        }

        World.ctx.fillStyle = "orange";
        World.ctx.fillRect(
            this.position.x,
            this.position.y,
            this.dimension.width,
            this.dimension.height
        );
    }

    renderBoundingBox() {
        World.ctx.fillStyle = "blue";
        World.ctx.strokeRect(
            this.position.x,
            this.position.y,
            this.dimension.width,
            this.dimension.height
        );
    }

    renderImage(image: HTMLImageElement) {
        ImageUtils.renderImage(image, this.position, this.dimension);
    }

    renderSprite(frame: number): boolean {
        return this.spriteStore?.[this.state]?.render(
            frame,
            this.position,
            this.dimension
        );
    }

    private renderDebugInfo() {
        World.ctx.fillStyle = "red";
        World.ctx.fillText(
            EnumObjectState[this.state],
            this.position.x,
            this.position.y - 10
        );

        World.ctx.fillText(
            this.velocityY + "",
            this.position.x,
            this.position.y - 30
        );
    }

    private move() {
        if (this.gravityHasEffectOnIt) this.fall();

        this.velocityY && this.moveY(this.velocityY * frameRate * 10);
        this.velocityX && this.moveX(this.velocityX * frameRate * 10);
    }

    setState() {
        if (this.velocityY == 0 && this.velocityX == 0)
            this.state = EnumObjectState.idle;
        if (this.velocityY < 0) this.state = EnumObjectState.jumping;
        else if (this.velocityY > 0) this.state = EnumObjectState.falling;
        else if (this.velocityX != 0) this.state = EnumObjectState.moving;
    }

    //TODO: set moving state
    //TODO: check collision on world object
    moveX(amount: number) {
        this.position.x += amount;

        if (this.isCollidable) {
            let collision = World.collidesWithWorldBoundaries(this);

            if (collision.x) {
                this.position.x =
                    this.position.x <= 0
                        ? 0
                        : World.width - this.dimension.width;
                this.velocityX = 0;
            }

            let collidedObject = World.detectCollision(this);
            if (!collidedObject) return;

            this.popObjectHorizontal(collidedObject);

            this.velocityX = 0;
        }
    }

    moveY(amount: number) {
        this.position.y += amount;

        if (this.isCollidable) {
            let collision = World.collidesWithWorldBoundaries(this);

            if (collision.y) {
                this.position.y =
                    this.position.y <= 0
                        ? 0
                        : World.height - this.dimension.height;
                this.velocityY = 0;
                return;
            }

            let collidedObject = World.detectCollision(this);
            if (!collidedObject) return;

            this.popObjectVertical(collidedObject);

            this.velocityY = 0;
        }
    }

    popObjectVertical(collidedObject: GameObject) {
        if (this.position.y < collidedObject.position.y)
            this.position.y =
                collidedObject.position.y - this.dimension.height - frameRate;
        else
            this.position.y =
                collidedObject.calculatedPosition.bottom + frameRate;
    }

    popObjectHorizontal(collidedObject: GameObject) {
        if (this.position.x < collidedObject.position.x)
            this.position.x =
                collidedObject.position.x - this.dimension.width - frameRate;
        else
            this.position.x =
                collidedObject.calculatedPosition.right + frameRate;
    }

    fall() {
        this.velocityY += World.gravity * frameRate * 10;
    }
}
