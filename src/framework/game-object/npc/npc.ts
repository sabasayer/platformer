import { GameObject } from "../game-object";
import { NpcOptions } from "./npc.options";
import { EnumNpcType } from "./npc-type.enum";
import { EnumGameObjectType } from "../game-object-type.enum";

export class Npc extends GameObject {
    protected canFly: boolean;
    protected npcType: EnumNpcType;
    protected damage: number;

    constructor(options: NpcOptions) {
        super(options);
        this.canFly = options.canFly;
        this.npcType = options.npcType;
        this.velocityX = options.velocityX;
        this.damage = options.damage;
    }

    getDamage() {
        return this.damage;
    }

    onCollisionX(amount: number, collidedObjects: GameObject[]) {
        const newVelocityX =
            this.npcType == EnumNpcType.Patrol ? -this.velocityX : 0;
        this.velocityX = newVelocityX;

        const player = collidedObjects.find(
            (e) => e.getType() === EnumGameObjectType.Player
        );
        if (player) {
            player.takeDamage(this.damage);
        }
    }
}
