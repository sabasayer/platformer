import { GameAnimation } from "../../animation/game-animation";
import { getAsset } from "../../helper/index";
import { GameObject } from "../game-object";
import { EnumObjectState } from "../object-state.enum";
import { Projectile } from "./projectile";
import { ProjectileOptions } from "./projectile.options";

const animation = new GameAnimation(
    getAsset("sprites/fire/fire_sprite.png"),
    { height: 8, width: 8 },
    5
);

export const projectileFactory = (
    owner: GameObject,
    velocity: ProjectileOptions["velocity"]
) => {
    return new Projectile({
        dimension: { height: 8, width: 8 },
        owner: owner,
        initialPosition: {
            x: owner.getPosition.x,
            y: owner.getPosition.y + owner.getDimension.height / 2,
        },
        spriteStore: {
            [EnumObjectState.movingRight]: animation,
            [EnumObjectState.movingLeft]: animation,
        },
        velocity,
        gravityHasEffectOnIt: false,
        solid: true,
        collidesWith: "all",
    });
};
