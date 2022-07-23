import { GameObjectTypesUnion } from "../game-object/game-object-types-union";
import {
    GameObjectStateMachineData,
    SpriteStateMapData,
} from "./game-object-state-machine-data";

export interface GameObjectData
    extends Omit<
        GameObjectTypesUnion,
        "pinnedObjects" | "stateMachineOptions"
    > {
    pinnedObjects?: GameObjectData[];
    stateMachineOptions?: GameObjectStateMachineData;
}
