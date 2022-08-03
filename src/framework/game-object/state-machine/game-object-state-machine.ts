import cloneDeep from "lodash.clonedeep";
import { EnumObjectState } from "../object-state.enum";
import { Dimension } from "../types/dimension";
import { Position } from "../types/position";
import {
    GameObjectStateMachineOptions,
    GameObjectStateMap,
    GameObjectStateValue,
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
        this.previousState = this.currentState;
        this.currentState = state;
        const stateMap = this.states[this.currentState];
        const duration = stateMap?.duration;

        if (duration) this.handleDuration(stateMap, duration);
    }

    render(frame: number, targetPosition: Position, dimension: Dimension) {
        const state = this.states[this.currentState];
        if (!state) return;

        state.sprite.render(frame, targetPosition, dimension);
    }

    private handleDuration(stateMap: GameObjectStateValue, duration: number) {
        this.timeOut = setTimeout(() => {
            let nextState = stateMap.durationEndState ?? this.previousState;
            if (nextState === this.currentState)
                nextState = EnumObjectState.idle;

            this.changeState(nextState);
        }, duration);
    }
}
