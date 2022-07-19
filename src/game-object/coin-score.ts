import { LayerZIndexes } from "../framework/constants";
import { EnumItemType } from "../framework/game-object/item/item-type.enum";
import { UIElement } from "../framework/game-object/ui/ui-element";
import { StateManager } from "../framework/state-manager/game-state.manager";

const calculateScore = () => {
    const player = StateManager.getPlayer();
    const coins = player?.filterInventory(
        (e) => e.getItemType() === EnumItemType.Coin
    );

    return coins?.length ?? 0;
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
