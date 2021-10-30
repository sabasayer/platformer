import { GameObject } from "../game-object";
import { EnumItemType } from "./item-type.enum";
import { ItemObjectOptions } from "./item.options";

export class ItemObject extends GameObject {
    protected itemType: EnumItemType;

    constructor(options: ItemObjectOptions) {
        super(options);
        this.itemType = options.itemType;
    }

    getItemType() {
        return this.itemType;
    }
}
