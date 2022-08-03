import { GameObject } from "../game-object";
import { NpcOptions } from "./npc.options";
import { EnumNpcType } from "./npc-type.enum";
import { EnumGameObjectType } from "../game-object-type.enum";
import { StateManager } from "../../state-manager/game-state.manager";

export class Npc extends GameObject {
    protected canFly: boolean;
    protected npcType: EnumNpcType;
    protected canJump: boolean;
    protected attackPower: number;
    private jumpForce: number = 80;

    constructor(options: NpcOptions) {
        super(options);
        this.canFly = options.canFly;
        this.npcType = options.npcType;
        this.velocityX = options.velocityX;
        this.attackPower = options.attackPower;
        this.canJump = options.canJump;
    }

    getNpcType() {
        return this.npcType;
    }

    getAttackPower() {
        return this.attackPower;
    }

    onCollisionX(amount: number, collidedObjects: GameObject[]) {
        this.handleWallHit();

        const player = collidedObjects.find(
            (e) => e.getType() === EnumGameObjectType.Player
        );
        if (player) {
            player.takeDamage(this.attackPower);
        }
    }

    handleWallHit() {
        const newVelocityX =
            this.npcType == EnumNpcType.Patrol ? -this.velocityX : 0;
        this.velocityX = newVelocityX;
    }

    flipXVelocity() {
        this.velocityX = -this.velocityX;
    }

    flipYVelocity() {
        this.velocityY = -this.velocityY;
    }

    followPlayer() {
        const relativeDirection = this.getPlayerRelativeDirection();
        if (!relativeDirection) return;

        if (relativeDirection.x < 0) {
            if (this.velocityX > 0) this.flipXVelocity();
        } else if (relativeDirection.x > 0) {
            if (this.velocityX < 0) this.flipXVelocity();
        }

        if (relativeDirection.y < 0) {
            if (this.canFly && this.velocityY > 0) this.flipYVelocity();
            else if (this.canJump && relativeDirection.x === 0) this.jump();
        } else if (relativeDirection.y > 0) {
            if (this.canFly && this.velocityY < 0) this.flipYVelocity();
        }
    }

    getPlayerRelativeDirection() {
        const player = StateManager.getPlayer();
        if (!player) return;

        const playerPosition = player.getPosition;

        return {
            x: playerPosition.x - this.position.x,
            y: playerPosition.y - this.position.y,
        };
    }

    jump() {
        if (!this.canJump) return;

        if (this.velocityY == 0) {
            this.velocityY = -this.jumpForce;
        }
    }

    beforeRender() {
        if ([EnumNpcType.Intelligante, EnumNpcType.Boss].includes(this.npcType))
            this.followPlayer();
        super.beforeRender();
    }
}
