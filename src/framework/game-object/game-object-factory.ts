import { GameObjectData } from "../game-loader/game-object-data.interface";
import { createSpriteStateMap } from "../sprite/sprite-state-map-factory";
import { Background } from "./background/background";
import { GameObject } from "./game-object";
import { EnumGameObjectType } from "./game-object-type.enum";
import { GameObjectTypesUnion } from "./game-object-types-union";
import { ItemObject } from "./item/item";
import { Npc } from "./npc/npc";
import { Player } from "./player/player";

export const createGameObject = (data: GameObjectData): GameObject => {
    const pinnedObjects = data.pinnedObjects?.map((pinnedObject) =>
        createGameObject(pinnedObject)
    );

    const options: GameObjectTypesUnion = {
        ...data,
        pinnedObjects,
        spriteStateMap: data.spriteStateMap
            ? createSpriteStateMap(data.spriteStateMap)
            : undefined,
    };

    switch (data.type) {
        case EnumGameObjectType.Player:
            return new Player(options);
        case EnumGameObjectType.Item:
            return new ItemObject(options);
        case EnumGameObjectType.Npc:
            return new Npc(options);
        case EnumGameObjectType.Background:
            return new Background(options);
        default:
            return new GameObject(options);
    }
};
