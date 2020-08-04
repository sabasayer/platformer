import { Player } from "./framework/game-object/player/player";
import { World } from "./framework/world/world";
import { frameDelay } from "./framework/constants";
import { GameStateManager } from "./framework/initializer/game-state.manager";
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
