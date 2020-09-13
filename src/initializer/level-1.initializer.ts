import { Initializer } from "../framework/initializer/initializer";
import { GameObject } from "../framework/game-object/game-object";
import { playerObject } from "./player.object";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { patrol1 } from "./partol.object";

let object = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 42, y: 250 },
    dimension: { width: 250, height: 12 },
    isCollidable: true,
    gravityHasEffectOnIt: false,
});

let object2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 150, y: 330 },
    dimension: { width: 211, height: 11 },
    isCollidable: true,
    gravityHasEffectOnIt: false,
});

let object3 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 392, y: 382 },
    dimension: { width: 211, height: 11 },
    isCollidable: true,
    gravityHasEffectOnIt: false,
});

let object4 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 250, y: 720 },
    dimension: { width: 50, height: 50 },
    isCollidable: true,
    gravityHasEffectOnIt: false,
});

let objectEndGame = new GameObject({
    type: EnumGameObjectType.EndGameFlag,
    initialPosition: {
        x: 190,
        y: 150,
    },
    dimension: {
        width: 50,
        height: 50,
    },
    isCollidable: false,
    gravityHasEffectOnIt: false,
    imageUrl: "http://localhost:32/assets/sprites/red-flag.png",
});

let ground = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: {
        x: 0,
        y: 758,
    },
    dimension: {
        width: 500,
        height: 10,
    },
    isCollidable: true,
    gravityHasEffectOnIt: false,
});

let ground2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: {
        x: 550,
        y: 1208,
    },
    dimension: {
        width: 500,
        height: 10,
    },
    isCollidable: true,
    gravityHasEffectOnIt: false,
});

let backGround = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 0, y: 0, z: -1 },
    dimension: { width: 1920, height: 1080 },
    isCollidable: false,
    gravityHasEffectOnIt: false,
    imageUrl: "http://localhost:32/assets/background.jpg",
});

export const level1Initializer = new Initializer([
    playerObject,
    object,
    object2,
    object3,
    object4,
    objectEndGame,
    patrol1,
    ground,
    ground2,
    backGround,
]);
