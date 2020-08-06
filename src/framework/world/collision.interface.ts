import { GameObject } from "../game-object/game-object";

export interface Collision {
    collided: boolean,
    collidedObj?: GameObject
}