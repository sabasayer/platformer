import { GameObject } from "../framework/game-object/game-object";
import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";

export const loadingObject = new GameObject({
    dimension: { height: 100, width: 100 },
    initialPosition: {
        x: 50,
        y: 50,
    },
    type: EnumGameObjectType.IdleObject,
    imageUrl: "http://localhost:32/assets/loading.gif",
    gravityHasEffectOnIt: false,
});
