import { GameObject } from "../game-object";
import { EnumGameObjectType } from "../game-object-type.enum";
import { Player } from "../player/player";
import { ProjectileOptions } from "./projectile.options";

export class Projectile extends GameObject {
    private owner: GameObject;

    constructor(options: ProjectileOptions) {
        super({ ...options, type: EnumGameObjectType.Projectile });
        this.owner = options.owner;
        this.velocityX = options.velocity.x;
        this.velocityY = options.velocity.y;
    }

    get getOwner() {
        return this.owner;
    }

    onCollisionX(amount: number, collidedObjects: GameObject[]): void {
        this.onCollision(collidedObjects);
    }

    onCollisionY(amount: number, collidedObjects: GameObject[]): void {
        this.onCollision(collidedObjects);
    }

    onCollision(collidedObjects: GameObject[]) {
        const targetType =
            this.owner.getType() === EnumGameObjectType.Player
                ? EnumGameObjectType.Npc
                : EnumGameObjectType.Player;

        const targets = (collidedObjects = collidedObjects.filter(
            (e) => e.getType() === targetType
        ));

        if (targets.length) this.giveDamage(targets);

        this.die();
    }

    giveDamage(targets: GameObject[]) {
        const damage = (this.owner as Player).getAttackPower();
        targets.forEach((target) => target.takeDamage(damage));
    }
}
