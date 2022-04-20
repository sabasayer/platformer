import { GameObject } from "../game-object/game-object";
import { World } from "../world/world";

export class CollisionLogger {
    private lastObjectIds: number[] = [];
    private owner: GameObject;

    constructor(owner: GameObject) {
        this.owner = owner;
    }

    onCollision(objects: GameObject[], message?: string) {
        if (!World.isLogsOn) return;

        const ids = objects.map((e) => e.id);

        const hasNew = ids.some(
            (objId) => !this.lastObjectIds.some((id) => id === objId)
        );

        if (hasNew) {
            message && console.info("collision", message);
        }

        this.lastObjectIds = ids;
    }
}
