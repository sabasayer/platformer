import { GameObjectOptions } from "../game-object.options";

export interface PlayerOptions extends Omit<GameObjectOptions, "type"> {
    canMoveAtAir: boolean;
    attackPower :number
}
