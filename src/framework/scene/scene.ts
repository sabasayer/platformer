import { CollisionGroup } from "../collision/collision-group";
import { GameObject } from "../game-object/game-object";

class GameScene {
    private objects: GameObject[] = [];
    collisionGroup = new CollisionGroup();

    render(frame: number) {
        this.objects.forEach((obj) => obj.render(frame));
    }

    setObjects(objects: GameObject[]) {
        this.objects = objects;
        this.collisionGroup.setObjects(this.filterCollidableObjects(objects));
        this.sortObjectsByZ();
    }

    addObject(...objects: GameObject[]) {
        this.objects.push(...objects);
        this.collisionGroup.registerObject(
            ...this.filterCollidableObjects(objects)
        );
        this.sortObjectsByZ();
    }

    removeObject(object: GameObject) {
        const index = this.objects.findIndex((e) => e.id === object.id);

        if (index > -1) this.objects.splice(index, 1);
        this.collisionGroup.removeObject(object);
    }

    getObject(finder: (obj: GameObject) => boolean) {
        return this.objects.find((e) => finder(e));
    }

    clear() {
        this.objects = [];
        this.collisionGroup.clear();
    }

    private sortObjectsByZ(): GameObject[] {
        return this.objects.sort(
            (a, b) => a.calculatedPosition.z - b.calculatedPosition.z
        );
    }

    private filterCollidableObjects(objects: GameObject[]) {
        return objects.filter((e) => e.getCollidesWith);
    }
}

export const Scene = new GameScene();
