import { GameObject } from "../game-object/game-object";
import { EnumGameObjectType } from "../game-object/game-object-type.enum";
import { Projectile } from "../game-object/projectile/projectile";
import { collisionHelper } from "../helper/collision.helper";
import { World } from "../world/world";

export class CollisionGroup {
    private objects: GameObject[] = [];

    collidesWithWorldBoundaries(object: GameObject) {
        return collisionHelper.collidesWithWorldBoundaries(object, World);
    }

    detectCollision(object: GameObject) {
        let collidedObjects: GameObject[] = [];
        this.objects.forEach((e) => {
            if (e.id != object.id && this.collidesWithObject(object, e)) {
                collidedObjects.push(e);
            }
        });

        return collidedObjects;
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

        if (this.isOwnProjectile(object, secondObject)) return false;

        return collisionHelper.checkForObjects(object, secondObject);
    }

    isOwnProjectile(
        object: GameObject,
        secondObject: GameObject,
        end?: boolean
    ): boolean {
        const hasProjectile = (obj: GameObject) =>
            [EnumGameObjectType.Player, EnumGameObjectType.Npc].includes(
                obj.getType()
            );

        const isProjectile = (obj: GameObject) =>
            obj.getType() === EnumGameObjectType.Projectile;

        const result =
            hasProjectile(object) &&
            isProjectile(secondObject) &&
            (secondObject as Projectile).getOwner.id === object.id;

        const bothResult =
            result ||
            (!end && this.isOwnProjectile(secondObject, object, true));

        return bothResult;
    }

    setObjects(objects: GameObject[]) {
        this.objects = objects;
    }

    registerObject(...objects: GameObject[]) {
        this.objects.push(...objects);
    }

    removeObject(object: GameObject) {
        const index = this.objects.findIndex((e) => e.id === object.id);
        if (index > -1) this.objects.splice(index, 1);
    }

    clear() {
        this.objects = [];
    }
}
