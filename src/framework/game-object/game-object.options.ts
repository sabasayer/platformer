import { SpriteStateMap } from "../sprite/sprite-state-map.interface";
import { GameObject } from "./game-object";
import { EnumGameObjectType } from "./game-object-type.enum";
import { Dimension } from "./types/dimension";
import { Position } from "./types/position";

export interface GameObjectOptions {
    initialPosition: Position;
    dimension: Dimension;
    name?: string;
    imageUrl?: string;
    color?: string;
    spriteStore?: SpriteStateMap;
    collidesWith?: "all" | EnumGameObjectType[];
    gravityHasEffectOnIt?: boolean;
    type: EnumGameObjectType;
    health?: number;
    solid?: boolean;
    pinnedObjects?: GameObject[];
}
