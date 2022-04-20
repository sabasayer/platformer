import { Initializer } from "./initializer";
import { GameStates } from "./game-states.interface";
import { Level } from "../level/level";
import { EnumKeyboardKey } from "../input/keyboard.input";

export abstract class GameStateManager {
    private static states: GameStates = {};
    private static currentState: string = "";
    private static isEnding: boolean = false;

    static addState(state: string, level: Level) {
        this.states[state] = level;
    }

    static setCurrentState(state: string) {
        if (!Object.keys(this.states).some((s) => s == state))
            throw new Error(`${state} state is not registered`);

        this.getCurrentLevel()?.end();

        this.currentState = state;

        this.getCurrentLevel()?.start();
    }

    static runEndCondition() {
        if (this.isEnding) return;

        const currentLevel = this.getCurrentLevel();
        if (!currentLevel?.endCondition()) return;

        this.isEnding = true;
        const nextLevel = currentLevel.getNextLevel();
        if (!nextLevel) return;

        this.setCurrentState(nextLevel);
        this.isEnding = false;
    }

    static getCurrentState() {
        return this.currentState;
    }

    static getCurrentLevel(): Level | undefined {
        return this.states[this.currentState];
    }
}

window.addEventListener("keydown", (ev) => {
    if (ev.which === EnumKeyboardKey.ESCAPE)
        GameStateManager.setCurrentState("menu");
});
