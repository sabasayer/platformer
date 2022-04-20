import { LayerZIndexes } from "../framework/constants";
import { Initializer } from "../framework/initializer/initializer";
import { UIElement } from "../framework/game-object/ui/ui-element";
import { Camera } from "../framework/camera/camera";

const width = Camera.getRect().width;

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

export const menuInitializer = new Initializer([playButton]);
