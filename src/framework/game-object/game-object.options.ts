import { SpriteStore } from "../sprite/sprite-store.interface";
import { EnumGameObjectType } from "./game-object-type.enum";
import { Dimension } from "./types/dimension";
import { Position } from "./types/position";

export interface GameObjectOptions {
    initialPosition: Position;
    dimension: Dimension;
    imageUrl?: string;
    spriteStore?: SpriteStore;
    collidesWith?: "all" | EnumGameObjectType[];
    gravityHasEffectOnIt?: boolean;
    type: EnumGameObjectType;
    health?: number;
    solid?: boolean;
}
