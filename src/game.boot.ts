import { MENU_STATE } from "./framework/constants";
import { endGameLevel } from "./framework/level/end-game/end-game";
import { StateManager } from "./framework/state-manager/game-state.manager";
import { levelMenu } from "./level/level-menu";
import { levelTest } from "./level/level-test";

export const boot = async () => {
    // StateManager.addState({
    //     name: levelMenu.getName(),
    //     level: levelMenu,
    // });
    // StateManager.addState({ name: level1.getName(), level: level1, order: 1 });
    // StateManager.addState({ name: level2.getName(), level: level2, order: 2 });
    // StateManager.addState({
    //     name: levelTest.getName(),
    //     level: levelTest,
    //     order: 2,
    // });
    // StateManager.setCurrentState(levelMenu.getName());

    StateManager.addState({
        name: levelMenu.getName(),
        level: levelMenu,
    });

    StateManager.setCurrentState(MENU_STATE);

    await StateManager.load();

    StateManager.addState({
        name: endGameLevel.getName(),
        level: endGameLevel,
    });
};
