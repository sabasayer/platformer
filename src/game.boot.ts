import { StateManager } from "./framework/state-manager/game-state.manager";
import { level1 } from "./level/level-1";
import { level2 } from "./level/level-2";
import { levelMenu } from "./level/level-menu";

StateManager.addState({
    name: "menu",
    level: levelMenu,
});
StateManager.addState({ name: "level1", level: level1, order: 1 });
StateManager.addState({ name: "level2", level: level2, order: 2 });
StateManager.setCurrentState("menu");
