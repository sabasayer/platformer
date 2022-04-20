import { LayerZIndexes } from "../framework/constants";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { UIElement } from "../framework/game-object/ui/ui-element";
import { EnumInteractionType } from "../framework/interaction-log/interaction-type.enum";
import { World } from "../framework/world/world";

const calculateScore = () => {
    const deaths = World.interactionLogContainer.filterInteraction(
        (e) =>
            e.source.getType() === EnumGameObjectType.Player &&
            e.type === EnumInteractionType.kill
    );

    return deaths.length;
};

export const score = new UIElement({
    initialPosition: { x: 20, y: 20, z: LayerZIndexes.ui, fixed: true },
    dimension: { width: 100, height: 30 },
    text: {
        content: () => `Score: ${calculateScore()}`,
        color: "red",
        fontSize: 20,
    },
});
