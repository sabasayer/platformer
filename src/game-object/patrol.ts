import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { Npc } from "../framework/game-object/npc/npc";
import { EnumNpcType } from "../framework/game-object/npc/npc-type.enum";
import { EnumObjectState } from "../framework/game-object/object-state.enum";
import { Position } from "../framework/game-object/types/position";
import { getAsset } from "../framework/helper/index";
import { SpriteList } from "../framework/sprite/sprite-list";

const patrolSprite = new SpriteList([
    getAsset("sprites/npcs/blue_patrol/azul1.png"),
    getAsset("sprites/npcs/blue_patrol/azul2.png"),
    getAsset("sprites/npcs/blue_patrol/azul3.png"),
]);

export class Patrol extends Npc {
    constructor(position: Position, velocityX: number = 10) {
        super({
            type: EnumGameObjectType.Npc,
            initialPosition: position,
            dimension: { width: 16, height: 16 },
            collidesWith: [
                EnumGameObjectType.IdleObject,
                EnumGameObjectType.Player,
            ],
            gravityHasEffectOnIt: true,
            imageUrl: getAsset("sprites/npcs/blue_patrol/azul1.png"),
            spriteStore: {
                [EnumObjectState.idle]: patrolSprite,
                [EnumObjectState.movingRight]: patrolSprite,
                [EnumObjectState.movingLeft]: patrolSprite,
            },
            velocityX,
            canFly: false,
            npcType: EnumNpcType.Patrol,
            attackPower: 10,
            health: 20,
        });
    }
}
