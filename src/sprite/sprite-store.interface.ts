import { EnumObjectState } from "src/game-object/game-object";
import { Sprite } from "./sprite";

export type SpriteStore = {
    [key in EnumObjectState]?: Sprite;
};
