import { Sprite } from "../framework/sprite/sprite";

import idle1 from "../../assets/sprites/NPC's/blue patrol/azul1.png";
import idle2 from "../../assets/sprites/NPC's/blue patrol/azul2.png";
import idle3 from "../../assets/sprites/NPC's/blue patrol/azul3.png";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { GameObject, EnumObjectState } from "../framework/game-object/game-object";
import { Npc } from "../framework/game-object/npc/npc";
import { EnumNpcType } from "../framework/game-object/npc/npc-type.enum";


const patrolSprite = new Sprite([idle1, idle2, idle3])

export const patrol1 = new Npc({
    type: EnumGameObjectType.Enemy,
    initialPosition: { x: 200, y: 700 },
    dimension: { width: 16, height: 16 },
    isCollidable: true,
    gravityHasEffectOnIt: true,
    imageUrl: idle1,
    spriteStore: {
        [EnumObjectState.idle]: patrolSprite,
        [EnumObjectState.moving]: patrolSprite
    },
    velocityX: 10,
    canFly: false,
    npcType: EnumNpcType.Patrol,
    damage: 10
})
