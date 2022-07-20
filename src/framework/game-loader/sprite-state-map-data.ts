import { EnumObjectState } from "../game-object/object-state.enum";
import { ImageDimension } from "../utils/image-dimension.interface";

export interface SpriteData {
    url: string;
    spriteSheetOptions: ImageDimension;
}

export interface SpriteListData {
    urls: string[];
    oneAnimationCycleTime?: number;
}

export interface GameAnimationData {
    frames: (string | SpriteData)[];
    oneAnimationCycleTime?: number;
}

export interface SpriteStateMapDataValue {
    type: "Sprite" | "SpriteList" | "GameAnimation";
    options: SpriteData & SpriteListData & GameAnimationData;
}

export type SpriteStateMapData = {
    [key in EnumObjectState]?: SpriteStateMapDataValue;
};
