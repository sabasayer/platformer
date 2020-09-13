import { loadingObject } from "~/src/initializer/loading.object";
import { Camera } from "../camera/camera";
import { Drawer } from "../camera/drawer";
import { GameObject } from "../game-object/game-object";
import { GameObjectOptions } from "../game-object/game-object.options";
import { World } from "../world/world";

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
        this.resetObjectsState();
    }

    registerObjects() {
        this.gameObjects.forEach((object) => {
            object.register();
            object.setInitializer(this);
        });
    }

    addObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    getObject(finder: (obj: GameObject) => boolean): GameObject | null {
        return this.gameObjects.find(finder);
    }

    removeObject(finder: (obj: GameObject) => boolean) {
        const index = this.gameObjects.findIndex(finder);
        if (index > -1) this.gameObjects.splice(index, 1);
    }

    sortObjectsByZ(): GameObject[] {
        return this.gameObjects.sort(
            (a, b) => a.calculatedPosition.z - b.calculatedPosition.z
        );
    }

    render(frame: number) {
        if (this.loading) {
            this.showLoading();
        } else {
            this.sortObjectsByZ().forEach((obj) => {
                obj.render(frame);
            });
        }
    }

    protected showLoading() {
        Drawer.writeText(
            "Loading...",
            {
                x: Camera.getRect().width / 2 - 100,
                y: Camera.getRect().height / 2 - 50,
            },
            "red",
            "40px"
        );
    }

    protected resetObjectsState() {
        this.gameObjects.forEach((object) => {
            object.resetPosition();
        });
    }

    end() {
        this.destroyObjects();
    }

    protected destroyObjects() {
        this.gameObjects.forEach((object) => {
            object.destroy();
        });
    }
}
