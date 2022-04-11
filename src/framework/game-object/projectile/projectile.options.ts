import { GameObject } from "../game-object";
import { GameObjectOptions } from "../game-object.options";

export interface ProjectileOptions extends Omit<GameObjectOptions, "type"> {
    owner: GameObject;
    velocity: { x: number; y: number };
}
