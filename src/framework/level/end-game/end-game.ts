import { calculateCoinScore } from "~/src/game-object/coin-score";
import { calculateScore } from "~/src/game-object/score";
import { Camera } from "../../camera/camera";
import { END_GAME_STATE } from "../../constants";
import { UIElement } from "../../game-object/ui/ui-element";
import { StateManager } from "../../state-manager/game-state.manager";
import { Level } from "../level";

const width = Camera.getRect().width;
const height = Camera.getRect().height;

const heading = new UIElement({
    dimension: { width: width / 2, height: 80 },
    initialPosition: { x: 100, y: 100 },
    name: "statistics",
    text: {
        content: "You finished the game!",
        color: "rgba(51,102,204)",
        fontSize: 40,
    },
});

const score = new UIElement({
    dimension: { width: width / 2, height: 150 },
    initialPosition: { x: 100, y: 150 },
    name: "statistics",
    text: {
        content: () => `Score: ${calculateScore()}`,
        fontSize: 40,
    },
});

const coinScore = new UIElement({
    dimension: { width: width / 2, height: 150 },
    initialPosition: { x: 100, y: 300 },
    name: "statistics",
    text: {
        content: () => `Coins: ${calculateCoinScore()}`,
        fontSize: 40,
    },
});

const calculateTime = () => {
    const levels = StateManager.levels;
    return levels.reduce((sum, e) => e?.playTime ?? 0, 0) / 1000;
};

const time = new UIElement({
    dimension: { width: width / 2, height: 150 },
    initialPosition: { x: 100, y: 450 },
    name: "statistics",
    text: {
        content: () => `Time: ${calculateTime()} sec`,
        fontSize: 40,
    },
});

const pressEnterText = new UIElement({
    dimension: { width: width / 2, height: 80 },
    initialPosition: { x: 100, y: 600 },
    name: "statistics",
    text: {
        content: "Press Enter to restart",
        color: "gray",
        fontSize: 20,
    },
});

export class EndGame extends Level {
    constructor() {
        super({
            name: END_GAME_STATE,
            width,
            height,
            objects: [heading, score, coinScore, time, pressEnterText],
        });
    }

    start(): void {
        super.start();
        Camera.move({ x: 0, y: 0 });
        this.listenEvent();
    }

    private clickListener(ev: KeyboardEvent) {
        if (ev.key === "Enter") StateManager.runGameOwer();
    }

    listenEvent() {
        window.addEventListener("keydown", this.clickListener);
    }

    end(): void {
        super.end();
        window.removeEventListener("keydown", this.clickListener);
    }
}

export const endGameLevel = new EndGame();
