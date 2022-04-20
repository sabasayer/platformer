import { Initializer } from "../framework/initializer/initializer";
import { GameObject } from "../framework/game-object/game-object";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { createPatrol } from "../level/objects/patrol.object";
import { playerObject } from "../level/objects/player.object";
import { getAsset } from "../framework/helper/index";
import { createCoin } from "../level/objects/coin.object";
import { Background } from "../framework/game-object/background/background";
import { UIElement } from "../framework/game-object/ui/ui-element";
import { LayerZIndexes } from "../framework/constants";
import { score } from "../game-object/score";
import { coinScore } from "../game-object/coin-score";

const object = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 42, y: 250 },
    dimension: { width: 250, height: 12 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const object2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 150, y: 330 },
    dimension: { width: 211, height: 11 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const object3 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 392, y: 382 },
    dimension: { width: 211, height: 11 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const object4 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 250, y: 720 },
    dimension: { width: 50, height: 50 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const objectEndGame = new GameObject({
    type: EnumGameObjectType.EndGameFlag,
    initialPosition: {
        x: 190,
        y: 150,
    },
    dimension: {
        width: 50,
        height: 50,
    },
    collidesWith: [EnumGameObjectType.Player],
    solid: false,
    gravityHasEffectOnIt: false,
    imageUrl: getAsset("sprites/red-flag.png"),
});

const ground = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: {
        x: 0,
        y: 758,
    },
    dimension: {
        width: 500,
        height: 10,
    },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const ground2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: {
        x: 0,
        y: 1200,
    },
    dimension: {
        width: 2000,
        height: 1,
    },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
});

const background = new Background({
    initialPosition: { x: 0, y: 0 },
    dimension: { width: 2048, height: 1546 },
    images: [
        { url: getAsset("backgrounds/_11_background.png") },
        {
            url: getAsset("backgrounds/_10_distant_clouds.png"),
            parrallaxSpeed: 0.1,
        },
        {
            url: getAsset("backgrounds/_09_distant_clouds1.png"),
            parrallaxSpeed: 0.2,
        },
        { url: getAsset("backgrounds/_08_clouds.png"), parrallaxSpeed: 0.3 },
        {
            url: getAsset("backgrounds/_07_huge_clouds.png"),
            parrallaxSpeed: 0.3,
        },
        { url: getAsset("backgrounds/_06_hill2.png"), parrallaxSpeed: 0.1 },
        { url: getAsset("backgrounds/_05_hill1.png"), parrallaxSpeed: 0.2 },
        { url: getAsset("backgrounds/_04_bushes.png"), parrallaxSpeed: 0.3 },
        {
            url: getAsset("backgrounds/_03_distant_trees.png"),
            parrallaxSpeed: 0.4,
        },
        {
            url: getAsset("backgrounds/_02_trees_and_bushes.png"),
        },
        { url: getAsset("backgrounds/_01_ground.png") },
    ],
});

export const level1Initializer = new Initializer([
    playerObject,
    object,
    object2,
    object3,
    object4,
    objectEndGame,
    createPatrol({ x: 200, y: 700 }),
    createPatrol({ x: 100, y: 1500 }),
    createPatrol({ x: 100, y: 400 }),
    createPatrol({ x: 100, y: 500 }),
    createPatrol({ x: 100, y: 200 }),
    createPatrol({ x: 100, y: 1100 }),
    createCoin({ x: 150, y: 720 }),
    ground,
    ground2,
    background,
    score,
    coinScore,
]);
