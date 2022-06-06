import { EnumEvent } from "../framework/game-object/menu/event.enum";
import { Menu } from "../framework/game-object/menu/menu";
import { StateManager } from "../framework/state-manager/game-state.manager";
import { LayerZIndexes } from "../framework/constants";
import { UIElement } from "../framework/game-object/ui/ui-element";
import { Camera } from "../framework/camera/camera";

const width = Camera.getRect().width;
const height = Camera.getRect().height;

const playButton = new UIElement({
    dimension: { width: width / 2, height: 80 },
    initialPosition: { x: 100, y: 100, z: LayerZIndexes.menu },
    name: "play",
    text: {
        content: "Start To Play",
        color: "white",
        fontSize: 30,
    },
    color: "steelblue",
});

export const levelMenu = new Menu({
    name: "menu",
    width,
    height,
    events: [
        {
            elementName: "play",
            eventName: EnumEvent.click,
            listener: (menu) => StateManager.setCurrentState("level1"),
        },
    ],
    objects: [playButton],
});
