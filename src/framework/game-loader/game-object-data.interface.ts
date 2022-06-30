import { GameObjectOptions } from "../game-object/game-object.options";

export interface GameObjectData
    extends Omit<GameObjectOptions, "pinnedObjects"> {
    pinnedObjects?: GameObjectData[];
}
