import { GameObjectTypesUnion } from "../game-object/game-object-types-union";
import { SpriteStateMapData } from "./sprite-state-map-data";

export interface GameObjectData
    extends Omit<GameObjectTypesUnion, "pinnedObjects" | "spriteStateMap"> {
    pinnedObjects?: GameObjectData[];
    spriteStateMap?: SpriteStateMapData;
}
