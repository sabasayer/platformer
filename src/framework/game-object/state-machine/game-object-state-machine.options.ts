import { SpriteUnion } from "../../sprite/sprite-state-map.interface";
import { EnumObjectState } from "../object-state.enum";

export type GameObjectStateMap = {
    [key in EnumObjectState]: {
        sprite: SpriteUnion;
        duration?: number;
        durationEndState?: EnumObjectState;
    };
};

export interface GameObjectStateMachineOptions {
    initial: EnumObjectState;
    states: GameObjectStateMap;
}
