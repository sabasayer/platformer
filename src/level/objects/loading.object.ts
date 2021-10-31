import { GameObject } from "../../framework/game-object/game-object";
import { EnumGameObjectType } from "../../framework/game-object/game-object-type.enum";
import { getAsset } from "../../framework/helper/index";

export const loadingObject = new GameObject({
    dimension: { height: 100, width: 100 },
    initialPosition: {
        x: 50,
        y: 50,
    },
    type: EnumGameObjectType.IdleObject,
    imageUrl: getAsset("loading.gif"),
    gravityHasEffectOnIt: false,
});
