import { GameObjectData } from "../game-loader/game-object-data.interface";
import { GameObject } from "./game-object";
import { GameObjectOptions } from "./game-object.options";

export const createGameObject = (data: GameObjectData): GameObject => {
    const pinnedObjects = data.pinnedObjects?.map((pinnedObject) =>
        createGameObject(pinnedObject)
    );

    const options: GameObjectOptions = {
        ...data,
        pinnedObjects,
    };

    return new GameObject(options);
};
