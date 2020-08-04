import { Sprite } from "../framework/sprite/sprite";
import { Player } from "../framework/game-object/player/player";
import { EnumObjectState } from "../framework/game-object/game-object";
import idle1 from "../../assets/sprites/Player/idle/anim1.png";
import idle2 from "../../assets/sprites/Player/idle/anim2.png";
import idle3 from "../../assets/sprites/Player/idle/anim3.png";
import idle4 from "../../assets/sprites/Player/idle/anim4.png";

import run1 from "../../assets/sprites/Player/run/anim5.png";
import run2 from "../../assets/sprites/Player/run/anim6.png";
import run3 from "../../assets/sprites/Player/run/anim7.png";
import run4 from "../../assets/sprites/Player/run/anim8.png";
import run5 from "../../assets/sprites/Player/run/anim9.png";
import run6 from "../../assets/sprites/Player/run/anim10.png";
import run7 from "../../assets/sprites/Player/run/anim11.png";
import run8 from "../../assets/sprites/Player/run/anim12.png";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";

let playerIdleSprite = new Sprite([idle1, idle2, idle3, idle4]);
let playerRunSprite = new Sprite([
    run1,
    run2,
    run3,
    run4,
    run5,
    run6,
    run7,
    run8,
]);

let playerJumpingSprite = new Sprite([run7]);
let playerFallinggSprite = new Sprite([run4]);

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
    imageUrl: idle1,
    isCollidable: true,
    type: EnumGameObjectType.Player,
    health: 100
});

