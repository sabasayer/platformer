import { Camera } from "../camera/camera";
import { GameObject } from "../game-object/game-object";
import { BoundingBox } from "../game-object/types/bounding-box";
import { Dimension } from "../game-object/types/dimension";
import { StateManager } from "../state-manager/game-state.manager";

class CollisionHelper {
    checkForBoundingBoxes = (
        boundingBox: BoundingBox,
        boundingBoxSecond: BoundingBox
    ): boolean => {
        return (
            (boundingBox.left - boundingBoxSecond.right) *
                (boundingBox.right - boundingBoxSecond.left) <=
                0 &&
            (boundingBox.top - boundingBoxSecond.bottom) *
                (boundingBox.bottom - boundingBoxSecond.top) <=
                0
        );
    };

    checkForObjects = (obj: GameObject, obj2: GameObject): boolean => {
        if (obj.calculatedPosition.z !== obj2.calculatedPosition.z)
            return false;

        if (!this.checksCollidesWith(obj, obj2)) return false;

        const boundingBox = obj.getBoundingBox;
        const boundingBoxSecond = obj2.getBoundingBox;

        return collisionHelper.checkForBoundingBoxes(
            boundingBox,
            boundingBoxSecond
        );
    };

    collidesWithWorldBoundaries(object: GameObject) {
        const worldDimensions = this.getWordlDimensions();

        let collisions: { [key: string]: boolean } = {};
        let boundingBox = object.getBoundingBox;
        if (boundingBox.right >= worldDimensions.width) collisions.x = true;

        if (boundingBox.left <= 0) collisions.x = true;

        if (boundingBox.top <= 0) collisions.y = true;

        if (boundingBox.bottom >= worldDimensions.height) collisions.y = true;

        return collisions;
    }

    getWordlDimensions(): Dimension {
        const level = StateManager.getCurrentLevel();
        if (!level)
            return {
                width: 1024,
                height: 768,
            };

        return level.dimensions;
    }

    private checksCollidesWith = (
        obj: GameObject,
        obj2: GameObject
    ): boolean => {
        const collidesWith = obj.getCollidesWith();
        const collidesWith2 = obj2.getCollidesWith();

        if (!collidesWith || !collidesWith2) return false;

        if (collidesWith === "all" && collidesWith2 === "all") return true;

        const forFirst =
            collidesWith === "all" || collidesWith.includes(obj2.getType());

        if (forFirst) return true;

        const forSecond =
            collidesWith2 === "all" || collidesWith2.includes(obj.getType());

        return forSecond;
    };
}

export const collisionHelper = new CollisionHelper();
