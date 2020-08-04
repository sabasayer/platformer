import { frameRate, framePerSecond } from "../constants";
import { World } from "../world/world";
import { SpriteStore } from "~/src/framework/sprite/sprite-store.interface";
import { ImageUtils } from "../utils/image.utils";
import { GameObjectOptions } from "./game-object.options";
import { EnumGameObjectType } from "./game-object-type.enum";
import { Initializer } from "../initializer/initializer";

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
    protected type: EnumGameObjectType
    protected position: Position;
    protected dimension: Dimension;

    protected velocityY: number = 0;
    protected velocityX: number = 0;
    protected accelarationX: number = 1;
    protected accelarationY: number = 1;

    protected isCollidable: boolean = false;
    protected gravityHasEffectOnIt: boolean = true;
    protected imageUrl: string = "";
    protected image: HTMLImageElement;

    protected spriteStore: SpriteStore;

    protected state: EnumObjectState = EnumObjectState.idle;

    protected initialPositions: Position;
    protected health?: number;
    protected initializer?: Initializer;

    get calculatedPosition() {
        return {
            left: this.position.x,
            right: this.position.x + this.dimension.width,
            top: this.position.y,
            bottom: this.position.y + this.dimension.height,
        };
    }

    constructor(options: GameObjectOptions) {
        this.position = options.initialPosition;
        this.isCollidable = options.isCollidable;
        this.dimension = options.dimension;
        this.spriteStore = options.spriteStore;
        this.imageUrl = options.imageUrl;
        this.gravityHasEffectOnIt = options.gravityHasEffectOnIt ?? true;
        this.type = options.type;
        this.health = options.health;

        this.initialPositions = {
            x: options.initialPosition.x,
            y: options.initialPosition.y
        };
        this.createImage();
    }

    getIsCollidable() {
        return this.isCollidable;
    }

    getType() {
        return this.type;
    }

    register() {
        World.registerObject(this);
    }

    setInitializer(initializer: Initializer) {
        this.initializer = initializer
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
        this.renderBody(frame);
        this.renderBoundingBox();
        if (this.health)
            this.renderHealthBar()

        this.afterRender();
    }

    afterRender() {
        this.calculateState();
    }

    private renderBody(frame: number) {
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
            this.position.y - 15
        );

        World.ctx.fillText(
            this.velocityY + "",
            this.position.x,
            this.position.y - 30
        );
    }

    private renderHealthBar() {
        World.ctx.fillStyle = "red";

        World.ctx.fillRect(this.position.x,
            this.position.y - 10,
            this.health ?? 0,
            5)
    }

    private move() {
        if (this.gravityHasEffectOnIt) this.fall();

        this.velocityY && this.moveY(this.velocityY * frameRate * 10);
        this.velocityX && this.moveX(this.velocityX * frameRate * 10);
    }

    private calculateState() {
        if (this.velocityY == 0 && this.velocityX == 0)
            this.state = EnumObjectState.idle;
        if (this.velocityY < 0) this.state = EnumObjectState.jumping;
        else if (this.velocityY > 0) this.state = EnumObjectState.falling;
        else if (this.velocityX != 0) this.state = EnumObjectState.moving;
    }

    resetPosition() {
        this.position.x = this.initialPositions.x;
        this.position.y = this.initialPositions.y;
    }

    setPositions(position: Position) {
        this.position = position;
    }

    moveX(amount: number) {
        this.position.x += amount;

        const collision = this.checkHorizontalCollision();
        if (collision.collided)
            this.velocityX = 0;

        return collision;
    }

    checkHorizontalCollision(): {
        collided: boolean,
        collidedObj?: GameObject
    } {
        if (this.isCollidable) {
            let collision = World.collidesWithWorldBoundaries(this);

            if (collision.x) {
                this.position.x =
                    this.position.x <= 0
                        ? 0
                        : World.width - this.dimension.width;
                return {
                    collided: true
                }
            }

            let collidedObj = World.detectCollision(this);
            if (!collidedObj) return {
                collided: false
            };

            this.popObjectHorizontal(collidedObj);

            return {
                collided: true,
                collidedObj
            }
        }

        return {
            collided: true
        }
    }

    moveY(amount: number) {
        this.position.y += amount;

        const collision = this.checkVerticalCollision();

        if (collision.collided)
            this.velocityY = 0;

        return collision
    }

    checkVerticalCollision(): {
        collided: boolean,
        collidedObj?: GameObject
    } {
        if (this.isCollidable) {
            let collision = World.collidesWithWorldBoundaries(this);

            if (collision.y) {
                this.position.y =
                    this.position.y <= 0
                        ? 0
                        : World.height - this.dimension.height;
                return {
                    collided: true
                };
            }

            let collidedObj = World.detectCollision(this);
            if (!collidedObj) return {
                collided: false
            };

            this.popObjectVertical(collidedObj);

            return {
                collided: true,
                collidedObj
            };
        }

        return {
            collided: false
        };
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

    takeDamage(damage: number) {
        if (this.health == undefined) return;

        // run take damage animation

        this.health -= damage;
        if (this.health <= 0)
            this.die()
    }

    die() {
        // run die animation or set state to die
        // dont render
        this.destroy();
    }

    destroy() {
        this.initializer?.removeObject(e => e.id == this.id)
        World.removeObject(this);
    }
}
