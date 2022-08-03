import { GameState } from "../state-manager/game-states.interface";
import { EnumKeyboardKey } from "../input/keyboard.input";
import { Level } from "../level/level";
import { gameLoader } from "../game-loader/game-loader";
import { END_GAME_STATE, MENU_STATE, STATIC_LEVELS } from "../constants";
import { Player } from "../game-object/player/player";
import { World } from "../world/world";

class GameStateManager {
    private states: GameState[] = [];
    private player?: Player;
    private currentState: string = "";
    private isEnding: boolean = false;

    get levels() {
        return this.states
            .filter((e) => !STATIC_LEVELS.includes(e.name))
            .map((e) => e.level);
    }

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

    reset() {
        this.states.forEach((state) => {
            if (!STATIC_LEVELS.includes(state.name)) state.level = undefined;
        });
    }

    runGameOwer() {
        this.getCurrentLevel()?.end();
        this.reset();
        World.interactionLogContainer.reset();
        this.setCurrentState(MENU_STATE);
    }

    private async loadLevel(name: string) {
        console.log("load level", name);

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

    async runEndCondition() {
        if (this.isEnding) return;

        const currentState = this.getCurrentStateObj();

        if (!currentState?.level?.endCondition()) return;

        this.isEnding = true;
        const nextState = this.getNextState(currentState);

        if (!nextState) return;

        await this.setCurrentState(nextState.name);
        this.isEnding = false;
    }

    getCurrentState() {
        return this.currentState;
    }

    getNextState(state: GameState) {
        const order = state.order;

        const nextState = this.states.find((e) => e.order === (order ?? 0) + 1);
        if (nextState) return nextState;

        if (this.currentState !== END_GAME_STATE)
            return this.states.find((e) => e.name === END_GAME_STATE);
    }

    getCurrentStateObj(): GameState | undefined {
        return this.states.find((e) => e.name === this.currentState);
    }

    getCurrentLevel(): Level | undefined {
        return this.getCurrentStateObj()?.level;
    }

    getPlayer() {
        return this.player;
    }
}

const StateManager = new GameStateManager();

window.addEventListener("keydown", (ev) => {
    if (ev.which === EnumKeyboardKey.ESCAPE)
        StateManager.setCurrentState(MENU_STATE);
});

window.$gameStateManager = StateManager;

export { StateManager };
