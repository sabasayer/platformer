import { Sprite } from "../framework/sprite/sprite";

import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import {
    GameObject,
    EnumObjectState,
} from "../framework/game-object/game-object";
import { Npc } from "../framework/game-object/npc/npc";
import { EnumNpcType } from "../framework/game-object/npc/npc-type.enum";

const patrolSprite = new Sprite([
    "http://localhost:32/assets/sprites/npcs/blue_patrol/azul1.png",
    "http://localhost:32/assets/sprites/npcs/blue_patrol/azul2.png",
    "http://localhost:32/assets/sprites/npcs/blue_patrol/azul3.png",
]);

export const patrol1 = new Npc({
    type: EnumGameObjectType.Enemy,
    initialPosition: { x: 200, y: 700 },
    dimension: { width: 16, height: 16 },
    isCollidable: true,
    gravityHasEffectOnIt: true,
    imageUrl: "http://localhost:32/assets/sprites/npcs/blue_patrol/azul1.png",
    spriteStore: {
        [EnumObjectState.idle]: patrolSprite,
        [EnumObjectState.moving]: patrolSprite,
    },
    velocityX: 10,
    canFly: false,
    npcType: EnumNpcType.Patrol,
    damage: 10,
});
