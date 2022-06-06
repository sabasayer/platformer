import { GameState } from "../state-manager/game-states.interface";
import { EnumKeyboardKey } from "../input/keyboard.input";
import { Level } from "../level/level";

class GameStateManager {
    private states: GameState[] = [];
    private currentState: string = "";
    private isEnding: boolean = false;

    addState(state: GameState) {
        this.states.push(state);
    }

    setCurrentState(state: string) {
        if (!this.states.some((e) => e.name === state))
            throw new Error(`${state} state is not registered`);

        this.getCurrentStateObj()?.level.end();

        this.currentState = state;

        this.getCurrentStateObj()?.level.start();
    }

    runEndCondition() {
        if (this.isEnding) return;

        const currentState = this.getCurrentStateObj();
        if (!currentState?.level.endCondition()) return;

        this.isEnding = true;
        const nextState = this.getNextState(currentState);
        if (!nextState) return;

        this.setCurrentState(nextState.name);
        this.isEnding = false;
    }

    getCurrentState() {
        return this.currentState;
    }

    getNextState(state: GameState) {
        const order = state.order;
        return order
            ? this.states.find((e) => e.order === order + 1)
            : undefined;
    }

    getCurrentStateObj(): GameState | undefined {
        return this.states.find((e) => e.name === this.currentState);
    }

    getCurrentLevel(): Level | undefined {
        return this.getCurrentStateObj()?.level;
    }
}

const StateManager = new GameStateManager();

window.addEventListener("keydown", (ev) => {
    if (ev.which === EnumKeyboardKey.ESCAPE)
        StateManager.setCurrentState("menu");
});

window.$gameStateManager = StateManager;

export { StateManager };
