import { GameObject } from "../game-object/game-object";
import { collisionHelper } from "../helper/collision.helper";

class GameWorld {
    width: number = 2500;
    height: number = 2000;
    gravity: number = 13;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    private worldObjects: GameObject[] = [];

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Context is not found");

        this.ctx = ctx;
        window.$gameWorld = this;
    }

    render() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    collidesWithWorldBoundaries(object: GameObject) {
        let collisions: { [key: string]: boolean } = {};
        let boundingBox = object.getBoundingBox();
        if (boundingBox.right >= World.width) collisions.x = true;

        if (boundingBox.left <= 0) collisions.x = true;

        if (boundingBox.top <= 0) collisions.y = true;

        if (boundingBox.bottom >= World.height) collisions.y = true;

        return collisions;
    }

    collidesWithObject(
        object: GameObject,
        secondObject: GameObject,
        checkIsCollidable: boolean = true
    ): boolean {
        if (
            checkIsCollidable &&
            (!object.getCollidesWith() || !secondObject.getCollidesWith())
        )
            return false;

        return collisionHelper.checkForObjects(object, secondObject);
    }

    registerObject(object: GameObject) {
        this.worldObjects.push(object);
    }

    removeObject(object: GameObject) {
        const index = this.worldObjects.findIndex((e) => e.id == object.id);

        if (index > -1) this.worldObjects.splice(index, 1);
    }

    detectCollision(object: GameObject) {
        let collidedObjects: GameObject[] = [];
        this.worldObjects.forEach((e) => {
            if (e.id != object.id && this.collidesWithObject(object, e)) {
                collidedObjects.push(e);
            }
        });

        return collidedObjects;
    }
}

const World = new GameWorld();
export { World };
