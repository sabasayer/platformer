import { GameObjectOptions } from "../game-object.options";
import { EnumNpcType } from "./npc-type.enum";

export interface NpcOptions extends GameObjectOptions {
    velocityX: number;
    npcType: EnumNpcType;
    canFly: boolean;
    canJump: boolean;
    attackPower: number;
}
