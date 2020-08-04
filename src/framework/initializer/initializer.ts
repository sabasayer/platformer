import { GameObject } from "../game-object/game-object";
import { GameObjectOptions } from "../game-object/game-object.options";

export class Initializer {
    protected gameObjects: GameObject[] = [];

    constructor(objects: GameObject[]) {
        this.gameObjects = objects;
    }

    start() {
        this.registerObjects();
        this.resetObjectsState();
    }

    registerObjects() {
        this.gameObjects.forEach(object => {
            object.register();
            object.setInitializer(this);
        })
    }

    addObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    getObject(finder: (obj: GameObject) => boolean): GameObject | null {
        return this.gameObjects.find(finder);
    }

    removeObject(finder: (obj: GameObject) => boolean) {
        const index = this.gameObjects.findIndex(finder);
        if (index > -1)
            this.gameObjects.splice(index, 1)
    }

    render(frame: number) {
        this.gameObjects.forEach(obj => {
            obj.render(frame);
        })
    }

    protected resetObjectsState() {
        this.gameObjects.forEach(object => {
            object.resetPosition()
        })
    }

    end() {
        this.destroyObjects();
    }

    protected destroyObjects() {
        this.gameObjects.forEach(object => object.destroy())
    }
}