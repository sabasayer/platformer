import { Sprite } from "../framework/sprite/sprite";
import { Player } from "../framework/game-object/player/player";

import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { EnumObjectState } from "../framework/game-object/object-state.enum";
import { getAsset } from "../framework/helper/index";
import { Position } from "../framework/game-object/types/position";

const playerIdleSprite = new Sprite([
    getAsset("sprites/player/idle/anim1.png"),
    getAsset("sprites/player/idle/anim2.png"),
    getAsset("sprites/player/idle/anim3.png"),
    getAsset("sprites/player/idle/anim4.png"),
]);
const playerIdleLeftSprite = new Sprite([
    getAsset("sprites/player/idle/anim5.png"),
    getAsset("sprites/player/idle/anim6.png"),
    getAsset("sprites/player/idle/anim7.png"),
    getAsset("sprites/player/idle/anim8.png"),
]);
const playerRunSprite = new Sprite(
    [
        getAsset("sprites/player/run/anim5.png"),
        getAsset("sprites/player/run/anim6.png"),
        getAsset("sprites/player/run/anim7.png"),
        getAsset("sprites/player/run/anim8.png"),
        getAsset("sprites/player/run/anim9.png"),
        getAsset("sprites/player/run/anim10.png"),
        getAsset("sprites/player/run/anim11.png"),
        getAsset("sprites/player/run/anim12.png"),
    ],
    1.4
);

const playerRunLeftSprite = new Sprite(
    [
        getAsset("sprites/player/run/anim13.png"),
        getAsset("sprites/player/run/anim14.png"),
        getAsset("sprites/player/run/anim15.png"),
        getAsset("sprites/player/run/anim16.png"),
        getAsset("sprites/player/run/anim17.png"),
        getAsset("sprites/player/run/anim18.png"),
        getAsset("sprites/player/run/anim19.png"),
        getAsset("sprites/player/run/anim20.png"),
    ],
    1.4
);

const playerJumpingSprite = new Sprite([
    getAsset("sprites/player/run/anim11.png"),
]);
const playerFallinggSprite = new Sprite([
    getAsset("sprites/player/run/anim8.png"),
]);

export const createPlayer = (position: Position) =>
    new Player({
        initialPosition: position,
        dimension: { width: 22, height: 32 },
        canMoveAtAir: true,
        spriteStore: {
            [EnumObjectState.idle]: playerIdleSprite,
            [EnumObjectState.idleLeft]: playerIdleLeftSprite,
            [EnumObjectState.movingRight]: playerRunSprite,
            [EnumObjectState.movingLeft]: playerRunLeftSprite,
            [EnumObjectState.jumping]: playerJumpingSprite,
            [EnumObjectState.falling]: playerFallinggSprite,
        },
        imageUrl: getAsset("sprites/player/idle/anim1.png"),
        isCollidable: true,
        type: EnumGameObjectType.Player,
        health: 100,
    });

export const playerObject = createPlayer({ x: 30, y: 130 });
