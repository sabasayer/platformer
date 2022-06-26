import { EnumGameObjectType } from "~/src/framework/game-object/game-object-type.enum";
import { ItemObject } from "~/src/framework/game-object/item/item";
import { EnumItemType } from "~/src/framework/game-object/item/item-type.enum";
import { EnumObjectState } from "~/src/framework/game-object/object-state.enum";
import { Position } from "~/src/framework/game-object/types/position";
import { getAsset } from "~/src/framework/helper/index";
import { GameAnimation } from "../framework/animation/game-animation";

export class Coin extends ItemObject {
    constructor(position: Position) {
        super({
            initialPosition: position,
            type: EnumGameObjectType.Item,
            itemType: EnumItemType.Coin,
            dimension: { width: 16, height: 16 },
            collidesWith: [
                EnumGameObjectType.Player,
                EnumGameObjectType.IdleObject,
            ],
            spriteStore: {
                [EnumObjectState.idle]: new GameAnimation(
                    getAsset("sprites/coins/MonedaD.png"),
                    { height: 16, width: 16 },
                    5
                ),
            },
            solid: false,
        });
    }
}
