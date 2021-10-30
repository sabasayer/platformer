import { Sprite } from "../framework/sprite/sprite";

import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { GameObject } from "../framework/game-object/game-object";
import { Npc } from "../framework/game-object/npc/npc";
import { EnumNpcType } from "../framework/game-object/npc/npc-type.enum";
import { EnumObjectState } from "../framework/game-object/object-state.enum";
import { Position } from "../framework/game-object/types/position";
import { getAsset } from "../framework/helper/index";

const patrolSprite = new Sprite([
    getAsset("sprites/npcs/blue_patrol/azul1.png"),
    getAsset("sprites/npcs/blue_patrol/azul2.png"),
    getAsset("sprites/npcs/blue_patrol/azul3.png"),
]);

export const createPatrol = (position: Position) =>
    new Npc({
        type: EnumGameObjectType.Npc,
        initialPosition: position,
        dimension: { width: 16, height: 16 },
        isCollidable: true,
        gravityHasEffectOnIt: true,
        imageUrl: getAsset("sprites/npcs/blue_patrol/azul1.png"),
        spriteStore: {
            [EnumObjectState.idle]: patrolSprite,
            [EnumObjectState.movingRight]: patrolSprite,
            [EnumObjectState.movingLeft]: patrolSprite,
        },
        velocityX: 10,
        canFly: false,
        npcType: EnumNpcType.Patrol,
        damage: 10,
    });
