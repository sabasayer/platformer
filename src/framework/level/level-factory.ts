import { LevelData } from "../game-loader/level-data.interface";
import { createGameObject } from "../game-object/game-object-factory";
import { Level } from "./level";
import { LevelOptions } from "./level.options";

export const createLevel = (levelData: LevelData): Level => {
    const objects =
        levelData.objects?.map((obj) => createGameObject(obj)) ?? [];

    const options: LevelOptions = {
        ...levelData,
        objects,
    };

    return new Level(options);
};
