import { Player } from "./player/player";
import { World } from "./world/world";
import { frameDelay } from "./constants";
import { GameStateManager } from "./initializer/game-state.manager";
import './game.boot'


let frame = 0;
let loop = () => {
    World.render();
    GameStateManager.getCurrentLevel()?.render(frame);
    GameStateManager.runEndCondition()

    frame++;
    if (frame > 60) frame = 0;

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, frameDelay);
};

requestAnimationFrame(loop);
