import { GameObject } from "../game-object";
import { EnumGameObjectType } from "../game-object-type.enum";
import { Projectile } from "./projectile";
import { ProjectileOptions } from "./projectile.options";

export const projectileFactory = (
    owner: GameObject,
    velocity: ProjectileOptions["velocity"]
) => {
    return new Projectile({
        dimension: { height: 5, width: 5 },
        owner: owner,
        initialPosition: {
            x: owner.getPosition.x + 50,
            y: owner.getPosition.y + 20,
        },
        velocity,
        gravityHasEffectOnIt: false,
        solid: true,
        collidesWith: "all",
    });
};
