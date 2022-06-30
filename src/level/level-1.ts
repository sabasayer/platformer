import { Level } from "../framework/level/level";
import { GameObject } from "../framework/game-object/game-object";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { createPatrol } from "../level/objects/patrol.object";
import { playerObject } from "../level/objects/player.object";
import { createCoin } from "../level/objects/coin.object";
import { Background } from "../framework/game-object/background/background";
import { score } from "../game-object/score";
import { coinScore } from "../game-object/coin-score";

const object = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 42, y: 250 },
    dimension: { width: 250, height: 12 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
    color: "rgba(51, 102, 157)",
});

const object2 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 150, y: 330 },
    dimension: { width: 211, height: 11 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
    color: "rgba(51, 102, 157)",
});

const object3 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 392, y: 382 },
    dimension: { width: 211, height: 11 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
    color: "rgba(51, 102, 157)",
});

const object4 = new GameObject({
    type: EnumGameObjectType.IdleObject,
    initialPosition: { x: 250, y: 720 },
    dimension: { width: 50, height: 50 },
    collidesWith: "all",
    gravityHasEffectOnIt: false,
    color: "rgba(51, 102, 157)",
});

const objectEndGame = new GameObject({
    type: EnumGameObjectType.EndGameFlag,
    initialPosition: {
        x: 590,
        y: 850,
    },
    dimension: {
        width: 50,
        height: 50,
    },
    collidesWith: [EnumGameObjectType.Player],
    solid: false,
    gravityHasEffectOnIt: false,
    imageUrl: "sprites/red-flag.png",
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
    color: "rgba(51, 102, 157)",
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
    color: "rgba(51, 102, 157)",
});

const killZone = new GameObject({
    type: EnumGameObjectType.KillZone,
    initialPosition: {
        x: 0,
        y: 1400,
    },
    dimension: {
        width: 2000,
        height: 500,
    },
    collidesWith: [EnumGameObjectType.Player],
    gravityHasEffectOnIt: false,
    color: "red",
});

const background = new Background({
    initialPosition: { x: 0, y: 0 },
    dimension: { width: 2048, height: 1546 },
    images: [
        { url: "backgrounds/_11_background.png", distance: 9 },
        {
            url: "backgrounds/_10_distant_clouds.png",
            distance: 8,
        },
        {
            url: "backgrounds/_09_distant_clouds1.png",
            distance: 7,
        },
        { url: "backgrounds/_08_clouds.png", distance: 6 },
        {
            url: "backgrounds/_07_huge_clouds.png",
            distance: 5,
        },
        { url: "backgrounds/_06_hill2.png", distance: 4 },
        { url: "backgrounds/_05_hill1.png", distance: 3 },
        { url: "backgrounds/_04_bushes.png", distance: 2 },
        {
            url: "backgrounds/_03_distant_trees.png",
            distance: 1,
        },
        {
            url: "backgrounds/_02_trees_and_bushes.png",
        },
        { url: "backgrounds/_01_ground.png" },
    ],
});

export const level1 = new Level({
    name: "level1",
    // music: "musics/bg-music.mp3"),
    width: 10000,
    height: 1500,
    objects: [
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
        killZone,
    ],
});
