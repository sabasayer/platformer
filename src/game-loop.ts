import { World } from "./framework/world/world";
import { FRAME_DELAY } from "./framework/constants";
import { StateManager } from "./framework/state-manager/game-state.manager";
import { Scene } from "./framework/scene/scene";
import { boot } from "./game.boot";

boot();

console.log(FRAME_DELAY);

let frame = 0;
let loop = () => {
    try {
        World.render();
        Scene.render(frame);
        StateManager.runEndCondition();

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
