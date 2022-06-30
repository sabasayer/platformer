import { SpriteList } from "../../framework/sprite/sprite-list";
import { Player } from "../../framework/game-object/player/player";

import { EnumObjectState } from "../../framework/game-object/object-state.enum";
import { Position } from "../../framework/game-object/types/position";
import { GameAnimation } from "~/src/framework/animation/game-animation";
import { spriteListFactory } from "~/src/framework/sprite/sprite-list-factory";
import { Sprite } from "~/src/framework/sprite/sprite";

const playerIdleSprite = new GameAnimation(
    spriteListFactory.createFromUrls([
        "sprites/player/idle/anim1.png",
        "sprites/player/idle/anim2.png",
        "sprites/player/idle/anim3.png",
        "sprites/player/idle/anim4.png",
    ])
);

const playerIdleLeftSprite = new GameAnimation(
    spriteListFactory.createFromUrls([
        "sprites/player/idle/anim5.png",
        "sprites/player/idle/anim6.png",
        "sprites/player/idle/anim7.png",
        "sprites/player/idle/anim8.png",
    ])
);
const playerRunSprite = new GameAnimation(
    spriteListFactory.createFromUrls([
        "sprites/player/run/anim5.png",
        "sprites/player/run/anim6.png",
        "sprites/player/run/anim7.png",
        "sprites/player/run/anim8.png",
        "sprites/player/run/anim9.png",
        "sprites/player/run/anim10.png",
        "sprites/player/run/anim11.png",
        "sprites/player/run/anim12.png",
    ])
);

const playerRunLeftSprite = new GameAnimation(
    spriteListFactory.createFromUrls([
        "sprites/player/run/anim13.png",
        "sprites/player/run/anim14.png",
        "sprites/player/run/anim15.png",
        "sprites/player/run/anim16.png",
        "sprites/player/run/anim17.png",
        "sprites/player/run/anim18.png",
        "sprites/player/run/anim19.png",
        "sprites/player/run/anim20.png",
    ])
);

const playerJumpingSprite = new Sprite("sprites/player/run/anim11.png");
const playerFallinggSprite = new Sprite("sprites/player/run/anim8.png");

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
        imageUrl: "sprites/player/idle/anim1.png",
        collidesWith: "all",
        health: 100,
        attackPower: 10,
    });

export const playerObject = createPlayer({ x: 30, y: 130 });
