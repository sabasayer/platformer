import { ImageDimension } from "../utils/image-dimension.interface";
import { GameObject } from "./game-object";
import { EnumGameObjectType } from "./game-object-type.enum";
import { GameObjectStateMachineOptions } from "./state-machine/game-object-state-machine.options";
import { Dimension } from "./types/dimension";
import { Position } from "./types/position";

export interface GameObjectOptions {
    initialPosition: Position;
    dimension: Dimension;
    name?: string;
    imageUrl?: string;
    imageOptions?: ImageDimension;
    color?: string;
    stateMachineOptions?: GameObjectStateMachineOptions;
    collidesWith?: "all" | EnumGameObjectType[];
    gravityHasEffectOnIt?: boolean;
    type: EnumGameObjectType;
    health?: number;
    solid?: boolean;
    pinnedObjects?: GameObject[];
}
