import { GameAnimation } from "../animation/game-animation";
import { Sprite } from "./sprite";
import { SpriteList } from "./sprite-list";

export type SpriteUnion = Sprite | SpriteList | GameAnimation;
