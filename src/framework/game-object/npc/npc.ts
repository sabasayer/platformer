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

    moveX(amount: number) {
        this.position.x += amount;
        const collision = this.checkHorizontalCollision();

        if (collision.collided) {
            const newVelocityX = this.npcType == EnumNpcType.Patrol ? -this.velocityX : 0
            this.velocityX = newVelocityX;

            if (this.type == EnumGameObjectType.Enemy) {
                const collidedObj = collision.collidedObj;
                if (collidedObj?.getType() == EnumGameObjectType.Player) {
                    collidedObj.takeDamage(this.damage);

                    collision.collidedObj.moveX(amount * 5)
                }
            }
        }

        return collision
    }
}