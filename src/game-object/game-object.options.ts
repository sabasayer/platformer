import { Dimension, Position } from "./game-object";
import { SpriteStore } from "../sprite/sprite-store.interface";
import { EnumGameObjectType } from "./game-object-type.enum";

export interface GameObjectOptions{
    initialPosition: Position;
    dimension: Dimension;
    imageUrl?: string;
    spriteStore?: SpriteStore;
    isCollidable?: boolean;
    gravityHasEffectOnIt?: boolean;
    type:EnumGameObjectType
}