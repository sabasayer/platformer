import { EnumEvent } from "../framework/game-object/menu/event.enum";
import { Menu } from "../framework/game-object/menu/menu";
import { GameStateManager } from "../framework/initializer/game-state.manager";
import { Level } from "../framework/level/level";
import { menuInitializer } from "../initializer/menu.initializer";

export const levelMenu = new Menu({
    name: "menu",
    initializer: menuInitializer,
    events: [
        {
            elementName: "play",
            eventName: EnumEvent.click,
            listener: (menu) => GameStateManager.setCurrentState("level1"),
        },
    ],
});
