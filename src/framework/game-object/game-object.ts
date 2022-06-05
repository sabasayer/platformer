import { FRAME_RATE, MOVEMENT_MULTIPLIER, ENVS } from "../constants";
import { World } from "../world/world";
import { SpriteStore } from "~/src/framework/sprite/sprite-store.interface";
import { GameObjectOptions } from "./game-object.options";
import { EnumGameObjectType } from "./game-object-type.enum";
import { Initializer } from "../initializer/initializer";
import { Drawer } from "../camera/drawer";
import { Collision } from "../world/collision.interface";
import { Position } from "./types/position";
import { Dimension } from "./types/dimension";
import { EnumObjectState } from "./object-state.enum";
import { BoundingBox } from "./types/bounding-box";
import { Game } from "../game";
import { CollisionLogger } from "../logger/collision-logger";

export class GameObject {
    id: number = Math.random();
    protected name?: string;
    protected type: EnumGameObjectType;
    protected position: Position;
    protected dimension: Dimension;

    protected velocityY: number = 0;
    protected velocityX: number = 0;
    protected accelarationX: number = 1;
    protected accelarationY: number = 1;

    protected collidesWith: GameObjectOptions["collidesWith"];
    protected gravityHasEffectOnIt: boolean = true;
    protected solid: boolean = true;
    protected imageUrl?: string = "";
    protected image?: HTMLImageElement;
    protected color?: string;

    protected spriteStore?: SpriteStore;

    protected state: EnumObjectState = EnumObjectState.idle;

    protected initialPositions: Position;
    protected health?: number;
    protected initializer?: Initializer;

    protected _loading: boolean = false;
    protected lastHorizontalState = EnumObjectState.movingRight;

    protected pinnedObjects = new Set<GameObject>();
    private logger: CollisionLogger;

    get getName() {
        return this.name;
    }

    get loading() {
        return this._loading;
    }

    get getPosition() {
        return this.position;
    }

    get getDimension() {
        return this.dimension;
    }

    get calculatedPosition() {
        return {
            left: this.position.x,
            right: this.position.x + this.dimension.width,
            top: this.position.y,
            bottom: this.position.y + this.dimension.height,
            z: this.position.z ?? 0,
        };
    }

    constructor(options: GameObjectOptions) {
        this.position = { ...options.initialPosition };
        this.collidesWith = options.collidesWith;
        this.dimension = options.dimension;
        this.spriteStore = options.spriteStore;
        this.imageUrl = options.imageUrl;
        this.color = options.color;
        this.gravityHasEffectOnIt =
            options.gravityHasEffectOnIt ?? this.gravityHasEffectOnIt;
        this.solid = options.solid ?? this.solid;
        this.type = options.type;
        this.health = options.health;
        this.pinnedObjects =
            new Set(options.pinnedObjects) ?? new Set<GameObject>();

        this.initialPositions = {
            ...options.initialPosition,
        };

        this.name = options.name;
        this.logger = new CollisionLogger(this);

        this.createImage();
    }

    getCollidesWith() {
        return this.collidesWith;
    }

    getType() {
        return this.type;
    }

    register() {
        World.registerObject(this);
    }

    setInitializer(initializer: Initializer) {
        this.initializer = initializer;
    }

    onLevelStart(initializer: Initializer) {
        this.register();
        this.setInitializer(initializer);
        this.resetPosition();
    }

    createImage() {
        if (!this.imageUrl) return;

        this._loading = true;

        let image = new Image();
        image.src = this.imageUrl;
        image.onload = () => {
            this.image = image;
            this._loading = false;
        };

        this._loading = false;
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

        if (Game.env == ENVS.dev) this.renderDebugInfo();
        this.renderBody(frame);
        if (Game.env == ENVS.dev) this.renderBoundingBox();
        if (this.health) this.renderHealthBar();

        this.afterRender();
    }

    afterRender() {
        this.calculateState();
        this.setHorizontalLastState();
    }

    protected renderBody(frame: number) {
        if (this.spriteStore && this.renderSprite(frame)) {
            return;
        }

        if (this.image) {
            this.renderImage(this.image);
            return;
        }

        if (this.color)
            Drawer.fillRect(this.position, this.dimension, this.color);
    }

    renderBoundingBox() {
        Drawer.strokeRect(this.position, this.dimension, "blue");
    }

    renderImage(image: HTMLImageElement) {
        Drawer.drawImage(image, this.position, this.dimension);
    }

    renderSprite(frame: number): boolean {
        return (
            this.spriteStore?.[this.state]?.render(
                frame,
                this.position,
                this.dimension
            ) ?? false
        );
    }

    private renderDebugInfo() {
        Drawer.writeText(
            EnumObjectState[this.state],
            {
                x: this.position.x,
                y: this.position.y - 15,
            },
            "red"
        );

        Drawer.writeText(
            this.velocityY + "",
            {
                x: this.position.x,
                y: this.position.y - 30,
            },
            "blue"
        );
    }

    private renderHealthBar() {
        Drawer.fillRect(
            {
                x: this.position.x,
                y: this.position.y - 10,
            },
            {
                width: this.health ?? 0,
                height: 5,
            },
            "pink"
        );
    }

    private move() {
        if (this.gravityHasEffectOnIt) this.fall();

        this.velocityY &&
            this.moveY(this.velocityY * FRAME_RATE * MOVEMENT_MULTIPLIER);
        this.velocityX &&
            this.moveX(this.velocityX * FRAME_RATE * MOVEMENT_MULTIPLIER);
    }

    private calculateState() {
        if (!this.velocityY && !this.velocityX) {
            this.state =
                this.lastHorizontalState === EnumObjectState.movingLeft
                    ? EnumObjectState.idleLeft
                    : EnumObjectState.idle;
        }
        if (this.velocityY < 0) {
            this.state =
                this.lastHorizontalState === EnumObjectState.movingLeft
                    ? EnumObjectState.jumpingLeft
                    : EnumObjectState.jumping;
        } else if (this.velocityY > 0)
            this.state =
                this.lastHorizontalState === EnumObjectState.movingLeft
                    ? EnumObjectState.fallingLeft
                    : EnumObjectState.falling;
        else if (this.velocityX > 0) {
            this.state = EnumObjectState.movingRight;
        } else if (this.velocityX < 0) {
            this.state = EnumObjectState.movingLeft;
        }
    }

    private setHorizontalLastState() {
        if (this.velocityX > 0)
            this.lastHorizontalState = EnumObjectState.movingRight;
        else if (this.velocityX < 0)
            this.lastHorizontalState = EnumObjectState.movingLeft;
    }

    pinObject = (object: GameObject) => {
        this.pinnedObjects.add(object);
    };

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
        if (collision.collided) {
            this.onCollisionX(amount, collision.collidedObjects);
        }

        this.afterMoveX(amount, collision.collided);

        return collision;
    }

    moveY(amount: number) {
        this.position.y += amount;
        const collision = this.checkVerticalCollision();
        if (collision.collided) {
            this.onCollisionY(amount, collision.collidedObjects);
        }

        this.afterMoveY(amount, collision.collided);

        return collision;
    }

    fall() {
        this.velocityY += World.gravity * FRAME_RATE * 10;
    }

    onCollisionX(amount: number, collidedObjects: GameObject[]) {
        this.logger.onCollision(collidedObjects);
        if (this.hasSolidCollision(collidedObjects)) this.velocityX = 0;
    }
    onCollisionY(amount: number, collidedObjects: GameObject[]) {
        this.logger.onCollision(collidedObjects);
        if (this.hasSolidCollision(collidedObjects)) this.velocityY = 0;
    }

    hasSolidCollision(collidedObjects: GameObject[]) {
        return !collidedObjects.length || collidedObjects.some((e) => e.solid);
    }

    afterMoveX(amount: number, collided: boolean) {
        if (!collided)
            this.pinnedObjects.forEach((object) => object.moveX(amount));
    }

    afterMoveY(amount: number, collided: boolean) {
        if (!collided)
            this.pinnedObjects.forEach((object) => object.moveY(amount));
    }

    checkHorizontalCollision(): Collision {
        const res: Collision = {
            collided: false,
            collidedObjects: [],
        };

        if (!this.collidesWith) return res;

        const collision = World.collidesWithWorldBoundaries(this);
        if (collision.x) {
            this.keepInWorldBoundariesX();
            res.collided = true;
        }

        const collidedObjects = World.detectCollision(this);
        if (!collidedObjects.length) return res;

        if (this.hasSolidCollision(collidedObjects))
            this.popObjectHorizontal(collidedObjects[0]);

        res.collided = true;
        res.collidedObjects = collidedObjects;
        return res;
    }

    checkVerticalCollision(): Collision {
        const res: Collision = {
            collided: false,
            collidedObjects: [],
        };

        if (!this.collidesWith) return res;

        const collision = World.collidesWithWorldBoundaries(this);
        if (collision.y) {
            this.keepInWorldBoundariesY();
            res.collided = true;
        }

        const collidedObjects = World.detectCollision(this);
        if (!collidedObjects.length) return res;

        if (this.hasSolidCollision(collidedObjects))
            this.popObjectVertical(collidedObjects[0]);

        res.collided = true;
        res.collidedObjects = collidedObjects;
        return res;
    }

    keepInWorldBoundariesX() {
        this.position.x =
            this.position.x <= 0 ? 0 : World.width - this.dimension.width;
    }

    keepInWorldBoundariesY() {
        this.position.y =
            this.position.y <= 0 ? 0 : World.height - this.dimension.height;
    }

    popObjectVertical(collidedObject: GameObject) {
        if (this.position.y < collidedObject.position.y)
            this.position.y =
                collidedObject.position.y - this.dimension.height - FRAME_RATE;
        else
            this.position.y =
                collidedObject.calculatedPosition.bottom + FRAME_RATE;
    }

    popObjectHorizontal(collidedObject: GameObject) {
        if (this.position.x < collidedObject.position.x)
            this.position.x =
                collidedObject.position.x - this.dimension.width - FRAME_RATE;
        else
            this.position.x =
                collidedObject.calculatedPosition.right + FRAME_RATE;
    }

    /**
     * @returns true if object is died
     */
    takeDamage(damage: number): boolean {
        if (this.health == undefined) return false;

        // run take damage animation

        this.health -= damage;
        if (this.health <= 0) {
            this.die();
            return true;
        }

        return false;
    }

    die() {
        // run die animation or set state to die
        this.state = EnumObjectState.dying;
        this.destroy();
    }

    destroy() {
        World.removeObject(this);
    }
}
