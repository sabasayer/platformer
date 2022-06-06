import { Level } from "../framework/level/level";
import { GameObject } from "../framework/game-object/game-object";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { playerObject } from "../level/objects/player.object";

const object1 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    dimension: {
        height: 45,
        width: 250,
    },
    initialPosition: {
        x: 150,
        y: 600,
    },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const object2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    dimension: {
        height: 20,
        width: 30,
    },
    initialPosition: {
        x: 50,
        y: 670,
    },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

export const level2 = new Level({
    name: "level2",
    width: 1900,
    height: 1500,
    objects: [playerObject, object1, object2],
});
