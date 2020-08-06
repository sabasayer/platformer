import { frameRate, framePerSecond } from "../constants";
import { World } from "../world/world";
import { SpriteStore } from "~/src/framework/sprite/sprite-store.interface";
import { ImageUtils } from "../utils/image.utils";
import { GameObjectOptions } from "./game-object.options";
import { EnumGameObjectType } from "./game-object-type.enum";
import { Initializer } from "../initializer/initializer";
import { Camera } from "../camera/camera";
import { Drawer } from "../camera/drawer";
import { Collision } from "../world/collision.interface";

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

        // this.renderDebugInfo();
        this.renderBody(frame);
        // this.renderBoundingBox();
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

        Drawer.fillRect(this.position, this.dimension, "orange")
    }

    renderBoundingBox() {
        Drawer.strokeRect(this.position, this.dimension, "blue")
    }

    renderImage(image: HTMLImageElement) {
        Drawer.drawImage(image, this.position, this.dimension);
    }

    renderSprite(frame: number): boolean {
        return this.spriteStore?.[this.state]?.render(
            frame,
            this.position,
            this.dimension
        );
    }

    private renderDebugInfo() {
        Drawer.writeText(EnumObjectState[this.state], {
            x: this.position.x,
            y: this.position.y - 15
        }, "red")

        Drawer.writeText(this.velocityY + "", {
            x: this.position.x,
            y: this.position.y - 30
        }, "blue")
    }

    private renderHealthBar() {
        Drawer.fillRect({
            x: this.position.x,
            y: this.position.y - 10
        }, {
            width: this.health ?? 0,
            height: 5
        }, "pink")

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

    checkHorizontalCollision(): Collision {
        let res: Collision = {
            collided: false
        }

        if (this.isCollidable) {
            let collision = World.collidesWithWorldBoundaries(this);

            if (collision.x) {
                this.position.x =
                    this.position.x <= 0
                        ? 0
                        : World.width - this.dimension.width;
                res.collided = true;
            }

            let collidedObj = World.detectCollision(this);
            if (!collidedObj) return res

            this.popObjectHorizontal(collidedObj);
            res.collided = true;
            res.collidedObj = collidedObj;
        }

        return res
    }

    moveY(amount: number) {
        this.position.y += amount;

        const collision = this.checkVerticalCollision();

        if (collision.collided)
            this.velocityY = 0;

        return collision
    }

    checkVerticalCollision(): Collision {
        let res: Collision = {
            collided: false
        }

        if (this.isCollidable) {
            let collision = World.collidesWithWorldBoundaries(this);

            if (collision.y) {
                this.position.y =
                    this.position.y <= 0
                        ? 0
                        : World.height - this.dimension.height;

                res.collided = true;
            }

            let collidedObj = World.detectCollision(this);
            if (!collidedObj) return res;

            this.popObjectVertical(collidedObj);

            res.collided = true;
            res.collidedObj = collidedObj

        }

        return res;
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
        World.removeObject(this);
    }
}
