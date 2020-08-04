import { EnumObjectState } from "~/src/framework/game-object/game-object";
import { Sprite } from "./sprite";

export type SpriteStore = {
    [key in EnumObjectState]?: Sprite;
};
