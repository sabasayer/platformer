import cloneDeep from "lodash.clonedeep";
import { EnumObjectState } from "../object-state.enum";
import { Dimension } from "../types/dimension";
import { Position } from "../types/position";
import {
    GameObjectStateMachineOptions,
    GameObjectStateMap,
} from "./game-object-state-machine.options";

export class GameObjectStateMachine {
    private currentState: EnumObjectState;
    private previousState: EnumObjectState;
    private states: GameObjectStateMap;
    private timeOut: number | null = null;
    constructor(options: GameObjectStateMachineOptions) {
        this.currentState = this.previousState = options.initial;
        this.states = cloneDeep(options.states);
    }

    get state() {
        return this.currentState;
    }

    changeState(state: EnumObjectState) {
        if (this.timeOut) clearTimeout(this.timeOut);

        this.previousState = this.currentState;
        this.currentState = state;
        const stateMap = this.states[this.currentState];
        const duration = stateMap?.duration;

        if (duration) {
            this.timeOut = setTimeout(() => {
                this.changeState(
                    stateMap.durationEndState ?? this.previousState
                );
            }, duration);
        }
    }

    render(frame: number, targetPosition: Position, dimension: Dimension) {
        const state = this.states[this.currentState];
        if (!state) return;

        state.sprite.render(frame, targetPosition, dimension);
    }
}
