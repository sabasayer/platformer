import { Initializer } from "./initializer";
import { playerObject } from "./player.object";
import { GameObject, EnumObjectState } from "../game-object/game-object";
import { EnumGameObjectType } from "../game-object/game-object-type.enum";

const object1 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    dimension: {
        height: 45,
        width: 250
    },
    initialPosition: {
        x: 150, y: 600
    },
    isCollidable: true,
    gravityHasEffectOnIt: false
})

const object2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    dimension: {
        height: 20,
        width: 30
    },
    initialPosition: {
        x: 50, y: 670
    },
    isCollidable: true,
    gravityHasEffectOnIt: false
})

export const level2Initializer = new Initializer([playerObject, object1, object2])