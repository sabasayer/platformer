import { World } from "./framework/world/world";
import { FRAME_DELAY } from "./framework/constants";
import { GameStateManager } from "./framework/initializer/game-state.manager";
import "./game.boot";

let frame = 0;
let loop = () => {
    try {
        World.render();
        const level = GameStateManager.getCurrentLevel();
        level?.render(frame);
        GameStateManager.runEndCondition();

        frame++;
        if (frame > 60) frame = 0;

        setTimeout(() => {
            requestAnimationFrame(loop);
        }, FRAME_DELAY);
    } catch (error) {
        console.error(error);
    }
};

requestAnimationFrame(loop);
