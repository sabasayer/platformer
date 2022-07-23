import { SpriteUnion } from "../../sprite/sprite-union";
import { EnumObjectState } from "../object-state.enum";

export interface GameObjectStateValue {
    sprite: SpriteUnion;
    duration?: number;
    durationEndState?: EnumObjectState;
}

export type GameObjectStateMap = {
    [key in EnumObjectState]?: GameObjectStateValue;
};

export interface GameObjectStateMachineOptions {
    initial: EnumObjectState;
    states: GameObjectStateMap;
}
