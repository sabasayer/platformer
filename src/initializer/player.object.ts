import { Sprite } from "../framework/sprite/sprite";
import { Player } from "../framework/game-object/player/player";
import { EnumObjectState } from "../framework/game-object/game-object";

import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";

let playerIdleSprite = new Sprite([
    "http://localhost:32/assets/sprites/player/idle/anim1.png",
    "http://localhost:32/assets/sprites/player/idle/anim2.png",
    "http://localhost:32/assets/sprites/player/idle/anim3.png",
    "http://localhost:32/assets/sprites/player/idle/anim4.png",
]);
let playerRunSprite = new Sprite(
    [
        "http://localhost:32/assets/sprites/player/run/anim5.png",
        "http://localhost:32/assets/sprites/player/run/anim6.png",
        "http://localhost:32/assets/sprites/player/run/anim7.png",
        "http://localhost:32/assets/sprites/player/run/anim8.png",
        "http://localhost:32/assets/sprites/player/run/anim9.png",
        "http://localhost:32/assets/sprites/player/run/anim10.png",
        "http://localhost:32/assets/sprites/player/run/anim11.png",
        "http://localhost:32/assets/sprites/player/run/anim12.png",
    ],
    1.4
);

let playerJumpingSprite = new Sprite([
    "http://localhost:32/assets/sprites/player/run/anim11.png",
]);
let playerFallinggSprite = new Sprite([
    "http://localhost:32/assets/sprites/player/run/anim8.png",
]);

export const playerObject = new Player({
    initialPosition: { x: 30, y: 30 },
    dimension: { width: 22, height: 32 },
    canMoveAtAir: true,
    spriteStore: {
        [EnumObjectState.idle]: playerIdleSprite,
        [EnumObjectState.moving]: playerRunSprite,
        [EnumObjectState.jumping]: playerJumpingSprite,
        [EnumObjectState.falling]: playerFallinggSprite,
    },
    imageUrl: "http://localhost:32/assets/sprites/player/idle/anim1.png",
    isCollidable: true,
    type: EnumGameObjectType.Player,
    health: 100,
});
