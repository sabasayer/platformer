import { GameObject } from "../game-object/game-object";

abstract class World {
    static width: number = 2500;
    static height: number = 2000;
    static gravity: number = 13;
    static ctx: CanvasRenderingContext2D;
    static canvas: HTMLCanvasElement;
    private static worldObjects: GameObject[] = [];

    static initialize() {
        if (this.canvas) return;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        (window as any).gameWorld = this;
    }

    static render() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static collidesWithWorldBoundaries(object: GameObject) {
        let collisions: { [key: string]: boolean } = {};
        let boundingBox = object.getBoundingBox();
        if (boundingBox.right >= World.width) collisions.x = true;

        if (boundingBox.left <= 0) collisions.x = true;

        if (boundingBox.top <= 0) collisions.y = true;

        if (boundingBox.bottom >= World.height) collisions.y = true;

        return collisions;
    }

    static collidesWithObject(object: GameObject, secondObject: GameObject, checkIsCollidable: boolean = true): boolean {
        if (checkIsCollidable && (!object.getIsCollidable() || !secondObject.getIsCollidable())) return false;

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

    static registerObject(object: GameObject) {
        this.worldObjects.push(object);
    }

    static removeObject(object: GameObject) {
        const index = this.worldObjects.findIndex(e => e.id == object.id);

        if (index > -1)
            this.worldObjects.splice(index, 1)
    }

    static detectCollision(object: GameObject) {
        let collidedObject: GameObject | null = null;
        this.worldObjects.forEach((e) => {
            if (e.id != object.id && this.collidesWithObject(object, e)) {
                collidedObject = e;
                return;
            }
        });

        return collidedObject;
    }
}

World.initialize();
export { World };
