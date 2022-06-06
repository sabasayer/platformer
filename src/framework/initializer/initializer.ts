import { Camera } from "../camera/camera";
import { Drawer } from "../camera/drawer";
import { GameObject } from "../game-object/game-object";
import { Scene } from "../scene/scene";

export class Initializer {
    protected gameObjects: GameObject[] = [];

    constructor(objects: GameObject[]) {
        this.gameObjects = objects;
    }

    get loading() {
        return this.gameObjects.some((e) => e.loading);
    }

    start() {
        this.registerObjects();
    }

    registerObjects() {
        Scene.setObjects(this.gameObjects);
        this.gameObjects.forEach((object) => {
            object.onLevelStart(this);
        });
    }

    addObject(gameObject: GameObject) {
        Scene.addObject(gameObject);
        this.gameObjects.push(gameObject);
    }

    getObject(finder: (obj: GameObject) => boolean): GameObject | null {
        return this.gameObjects.find(finder) ?? null;
    }

    removeObject(object: GameObject) {
        Scene.removeObject(object);
        const index = this.gameObjects.findIndex((e) => e.id === object.id);
        if (index > -1) this.gameObjects.splice(index, 1);
    }

    protected resetObjectsState() {
        this.gameObjects.forEach((object) => {
            object.resetPosition();
        });
    }

    end() {
        Scene.clear();
    }
}
