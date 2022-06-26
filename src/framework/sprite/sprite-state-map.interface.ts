import { GameAnimation } from "../animation/game-animation";
import { EnumObjectState } from "../game-object/object-state.enum";
import { Sprite } from "./sprite";
import { SpriteList } from "./sprite-list";

export type SpriteStateMap = {
    [key in EnumObjectState]?: Sprite | SpriteList | GameAnimation;
};
