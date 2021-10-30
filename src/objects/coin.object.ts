import { EnumGameObjectType } from "../framework/game-object/game-object-type.enum";
import { ItemObject } from "../framework/game-object/item/item";
import { EnumItemType } from "../framework/game-object/item/item-type.enum";
import { EnumObjectState } from "../framework/game-object/object-state.enum";
import { Position } from "../framework/game-object/types/position";
import { getAsset } from "../framework/helper/index";
import { Sprite } from "../framework/sprite/sprite";

const coinSprite = new Sprite([
    getAsset("sprites/goldCoin/goldCoin1.png"),
    getAsset("sprites/goldCoin/goldCoin2.png"),
    getAsset("sprites/goldCoin/goldCoin3.png"),
    getAsset("sprites/goldCoin/goldCoin4.png"),
    getAsset("sprites/goldCoin/goldCoin5.png"),
    getAsset("sprites/goldCoin/goldCoin6.png"),
    getAsset("sprites/goldCoin/goldCoin7.png"),
    getAsset("sprites/goldCoin/goldCoin8.png"),
    getAsset("sprites/goldCoin/goldCoin9.png"),
]);

export const createCoin = (position: Position) =>
    new ItemObject({
        type: EnumGameObjectType.Item,
        itemType: EnumItemType.Coin,
        initialPosition: position,
        dimension: { width: 32, height: 32 },
        isCollidable: true,
        imageUrl: getAsset("sprites/goldCoin/goldCoin1.png"),
        spriteStore: {
            [EnumObjectState.idle]: coinSprite,
        },
        gravityHasEffectOnIt: false,
    });
