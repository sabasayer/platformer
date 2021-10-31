import { EnumGameObjectType } from "~/src/framework/game-object/game-object-type.enum";
import { ItemObject } from "~/src/framework/game-object/item/item";
import { EnumItemType } from "~/src/framework/game-object/item/item-type.enum";
import { EnumObjectState } from "~/src/framework/game-object/object-state.enum";
import { Position } from "~/src/framework/game-object/types/position";
import { getAsset } from "~/src/framework/helper/index";
import { Sprite } from "~/src/framework/sprite/sprite";

export class Coin extends ItemObject {
    constructor(position: Position) {
        super({
            initialPosition: position,
            type: EnumGameObjectType.Item,
            itemType: EnumItemType.Coin,
            dimension: { width: 32, height: 32 },
            collidesWith: [
                EnumGameObjectType.Player,
                EnumGameObjectType.IdleObject,
            ],
            imageUrl: getAsset("sprites/goldCoin/goldCoin1.png"),
            spriteStore: {
                [EnumObjectState.idle]: new Sprite([
                    getAsset("sprites/goldCoin/goldCoin1.png"),
                    getAsset("sprites/goldCoin/goldCoin2.png"),
                    getAsset("sprites/goldCoin/goldCoin3.png"),
                    getAsset("sprites/goldCoin/goldCoin4.png"),
                    getAsset("sprites/goldCoin/goldCoin5.png"),
                    getAsset("sprites/goldCoin/goldCoin6.png"),
                    getAsset("sprites/goldCoin/goldCoin7.png"),
                    getAsset("sprites/goldCoin/goldCoin8.png"),
                    getAsset("sprites/goldCoin/goldCoin9.png"),
                ]),
            },
            solid: false,
        });
    }
}
