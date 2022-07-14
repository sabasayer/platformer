import { GameAnimation } from "../animation/game-animation";
import {
    SpriteData,
    SpriteStateMapData,
    SpriteStateMapDataValue,
} from "../game-loader/sprite-state-map-data";
import { EnumObjectState } from "../game-object/object-state.enum";
import { Sprite } from "./sprite";
import { SpriteList } from "./sprite-list";
import { spriteListFactory } from "./sprite-list-factory";
import { SpriteStateMap } from "./sprite-state-map.interface";

export const createSpriteStateMap = (
    data: SpriteStateMapData
): SpriteStateMap => {
    const stateMap: SpriteStateMap = {};

    Object.entries(data).map(([key, value]) => {
        stateMap[+key as EnumObjectState] = createValue(value);
    });

    return stateMap;
};

const createValue = (
    value: SpriteStateMapDataValue
): Sprite | SpriteList | GameAnimation => {
    const { type, options } = value;
    switch (type) {
        case "Sprite":
            return new Sprite(options.url, options.spriteSheetOptions);
        case "SpriteList":
            return new SpriteList(options.urls, options.oneAnimationCycleTime);
        case "GameAnimation":
            return new GameAnimation(
                spriteListFactory.createFromUrls(options.frames),
                options.oneAnimationCycleTime
            );
    }
};
