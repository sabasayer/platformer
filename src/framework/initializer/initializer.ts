import { Camera } from "../camera/camera";
import { Drawer } from "../camera/drawer";
import { GameObject } from "../game-object/game-object";

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
        this.sortObjectsByZ();
    }

    registerObjects() {
        this.gameObjects.forEach((object) => {
            object.register();
            object.setInitializer(this);
            object.resetPosition();
        });
    }

    addObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
        gameObject.register();
        gameObject.setInitializer(this);
        gameObject.resetPosition();

        this.sortObjectsByZ();
    }

    getObject(finder: (obj: GameObject) => boolean): GameObject | null {
        return this.gameObjects.find(finder) ?? null;
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
            this.gameObjects.forEach((obj) => {
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
