import { EnumObjectState } from "../game-object/object-state.enum";
import { ImageDimension } from "../utils/image-dimension.interface";

export interface SpriteData {
    url: string;
    spriteSheetOptions: ImageDimension;
}

export interface SpriteListData {
    urls: string[];
    animationDuration?: number;
}

export interface GameAnimationData {
    frames: (string | SpriteData)[];
    animationDuration?: number;
}

export interface SpriteStateMapDataValue {
    type: "Sprite" | "SpriteList" | "GameAnimation";
    options: SpriteData & SpriteListData & GameAnimationData;
}

export type SpriteStateMapData = {
    [key in EnumObjectState]?: SpriteStateMapDataValue;
};

export interface GameObjectStateValueData {
    sprite: SpriteStateMapDataValue;
    duration?: number;
    durationEndState?: EnumObjectState;
}

export type GameObjectStateData = {
    [key in EnumObjectState]?: GameObjectStateValueData;
};

export interface GameObjectStateMachineData {
    initial: EnumObjectState;
    states: GameObjectStateData;
}
