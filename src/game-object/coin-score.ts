import { LayerZIndexes } from "../framework/constants";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { EnumItemType } from "../framework/game-object/item/item-type.enum";
import { UIElement } from "../framework/game-object/ui/ui-element";
import { EnumInteractionType } from "../framework/interaction-log/interaction-type.enum";
import { World } from "../framework/world/world";
import { playerObject } from "../level/objects/player.object";

const calculateScore = () => {
    const coins = playerObject.filterInventory(
        (e) => e.getItemType() === EnumItemType.Coin
    );

    return coins.length;
};

export const coinScore = new UIElement({
    initialPosition: { x: 130, y: 20, z: LayerZIndexes.ui, fixed: true },
    dimension: { width: 100, height: 30 },
    text: {
        content: () => `Coins: ${calculateScore()}`,
        color: "yellow",
        fontSize: 20,
    },
});
