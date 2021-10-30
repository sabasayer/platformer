import { ItemObject } from "../item/item";
import { EnumItemType } from "../item/item-type.enum";

export class Inventory {
    private items: ItemObject[] = [];

    addItem(item: ItemObject) {
        if (this.items.some((e) => e.id === item.id)) return;

        this.items.push(item);
    }

    removeItem(item: ItemObject) {
        const index = this.items.findIndex((i) => i === item);
        if (~index) return;

        this.items.splice(index, 1);
    }
}
