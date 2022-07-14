import { GameState } from "../state-manager/game-states.interface";
import { EnumKeyboardKey } from "../input/keyboard.input";
import { Level } from "../level/level";
import { gameLoader } from "../game-loader/game-loader";
import { MENU_STATE } from "../constants";
import { Player } from "../game-object/player/player";

class GameStateManager {
    private states: GameState[] = [];
    private player?: Player;
    private currentState: string = "";
    private isEnding: boolean = false;

    async load() {
        const data = await gameLoader.load();
        const states = data.data.levels.map((dataLevel, i) => {
            const level = data.levels.find(
                (e) => e.getName() === dataLevel.name
            );
            return {
                name: dataLevel.name,
                order: i,
                level,
            };
        });

        this.player = data.player;
        this.states.push(...states);
    }

    addState(state: GameState) {
        this.states.push(state);
    }

    private async loadLevel(name: string) {
        const level = await gameLoader.loadLevel(name);
        const state = this.states.find((e) => e.name === name);
        if (!state) throw new Error("state not found. Name:" + name);

        state.level = level;
    }

    async setCurrentState(state: string) {
        if (!this.states.some((e) => e.name === state))
            throw new Error(`${state} state is not registered`);

        this.getCurrentLevel()?.end();

        this.currentState = state;

        if (!this.getCurrentLevel()) {
            await this.loadLevel(state);
        }

        this.getCurrentLevel()?.start(this.player);
    }

    runEndCondition() {
        if (this.isEnding) return;

        const currentState = this.getCurrentStateObj();

        if (!currentState?.level?.endCondition()) return;

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

        return this.states.find((e) => e.order === (order ?? 0) + 1);
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
        StateManager.setCurrentState(MENU_STATE);
});

window.$gameStateManager = StateManager;

export { StateManager };
