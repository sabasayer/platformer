import { GameObjectOptions } from "../game-object.options";
import { EnumItemType } from "./item-type.enum";

export interface ItemObjectOptions extends GameObjectOptions {
    itemType: EnumItemType;
}
