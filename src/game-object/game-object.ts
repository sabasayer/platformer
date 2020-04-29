import { frameRate, framePerSecond } from "../constants";
import { World } from "../world/world";
import { Sprite } from "src/sprite/sprite";
import { SpriteStore } from "src/sprite/sprite-store.interface";

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
    /**Collides with other solid objects and world boundaries */
    isCollidable: boolean = false;
    gravityHasEffectOnIt: boolean = true;
    imageUrl: string = "";
    image: HTMLImageElement;

    spriteStore: SpriteStore;

    protected state: EnumObjectState = EnumObjectState.idle;

    constructor(options: {
        initialPosition: Position;
        dimension: Dimension;
        imageUrl?: string;
        spriteStore?: SpriteStore;
        isCollidable?: boolean;
    }) {
        this.position = options.initialPosition;
        this.isCollidable = options.isCollidable;
        this.dimension = options.dimension;
        this.spriteStore = options.spriteStore;
        this.imageUrl = options.imageUrl;
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

    render(frame: number) {
        this.move();
        this.renderDebugInfo();
		this.renderBody(frame);
		this.renderBoundingBox();
        this.setState();
    }

    private renderBody(frame: number) {
        if (this.spriteStore) {
            this.renderSprite(frame);
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

	renderBoundingBox(){
		World.ctx.fillStyle = "blue";
        World.ctx.strokeRect(
            this.position.x,
            this.position.y,
            this.dimension.width,
            this.dimension.height
        );
	}

    renderImage(image: HTMLImageElement) {
        World.ctx.drawImage(
            image,
            this.position.x,
            this.position.y,
            this.dimension.width,
            this.dimension.height
        );
    }

    renderSprite(frame: number) {
        if (!this.spriteStore) return;

        let images = this.spriteStore[this.state]?.images;
        if (!images) {
            this.image && this.renderImage(this.image);
            return;
        }

        let framePerImage = framePerSecond / images.length;

		let index = Math.floor(frame / framePerImage);

        images[index] && this.renderImage(images[index]);
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
        this.moveY(this.velocityY * frameRate * 10);
        this.moveX(this.velocityX * frameRate * 10);
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
            if (collision.x || World.detectCollision(this)) {
                this.position.x -= amount;
                this.velocityX = 0;
            }
        }
    }

    moveY(amount: number) {
        this.position.y += amount;

        if (this.isCollidable) {
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
