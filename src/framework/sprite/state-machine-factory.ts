import { GameAnimation } from "../animation/game-animation";
import {
    GameObjectStateMachineData,
    SpriteData,
    SpriteStateMapData,
    SpriteStateMapDataValue,
} from "../game-loader/game-object-state-machine-data";
import { EnumObjectState } from "../game-object/object-state.enum";
import {
    GameObjectStateMachineOptions,
    GameObjectStateMap,
} from "../game-object/state-machine/game-object-state-machine.options";
import { Sprite } from "./sprite";
import { SpriteList } from "./sprite-list";

export const createStateMachineOptions = (
    data: GameObjectStateMachineData
): GameObjectStateMachineOptions => {
    const stateMap: GameObjectStateMap = {};

    Object.entries(data.states).map(([key, value]) => {
        const sprite = createValue(value.sprite);

        stateMap[+key as EnumObjectState] = {
            sprite,
            duration: value.duration,
            durationEndState: value.durationEndState,
        };
    });

    return {
        initial: data.initial,
        states: stateMap,
    };
};

const createValue = (
    value: SpriteStateMapDataValue
): Sprite | SpriteList | GameAnimation => {
    const { type, options } = value;
    switch (type) {
        case "Sprite":
            return new Sprite(options.url, options.spriteSheetOptions);
        case "SpriteList":
            return new SpriteList(options.urls, options.animationDuration);
        case "GameAnimation":
            return new GameAnimation(
                options.frames.map((e) => createSprite(e)),
                options.animationDuration
            );
    }
};

const createSprite = (options: string | SpriteData) => {
    if (typeof options === "string") return new Sprite(options);
    return new Sprite(options.url, options.spriteSheetOptions);
};
