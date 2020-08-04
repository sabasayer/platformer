import { GameStateManager } from "./initializer/game-state.manager";
import { level1 } from "./level/level-1";
import { level2 } from "./level/level-2";

(window as any).stateManager = GameStateManager;
GameStateManager.addState('level1', level1);
GameStateManager.addState('level2', level2);
GameStateManager.setCurrentState('level1');