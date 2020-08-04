import { GameObjectOptions } from "../game-object.options";

export interface PlayerOptions extends GameObjectOptions{
    canMoveAtAir: boolean;
}