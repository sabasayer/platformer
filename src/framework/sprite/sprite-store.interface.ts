import { EnumObjectState } from "../game-object/object-state.enum";
import { Sprite } from "./sprite";
import { SpriteGroup } from "./sprite-group";

export type SpriteStore = {
    [key in EnumObjectState]?: Sprite | SpriteGroup;
};
