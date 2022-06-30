import { LevelOptions } from "../level/level.options";
import { GameObjectData } from "./game-object-data.interface";

export interface LevelData extends Omit<LevelOptions, "objects"> {
    objects:GameObjectData[]
}
