import { GameStateManager } from "./framework/initializer/game-state.manager";
import { level1 } from "./level/level-1";
import { level2 } from "./level/level-2";
import { levelMenu } from "./level/level-menu";

(window as any).stateManager = GameStateManager;
GameStateManager.addState("menu", levelMenu);
GameStateManager.addState("level1", level1);
GameStateManager.addState("level2", level2);
GameStateManager.setCurrentState("menu");
