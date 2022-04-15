import { EnumObjectState } from "../game-object/object-state.enum";
import { Sprite } from "./sprite";
import { SpriteAnimation } from "./sprite-animation";

export type SpriteStore = {
    [key in EnumObjectState]?: Sprite | SpriteAnimation;
};
