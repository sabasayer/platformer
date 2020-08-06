import { World } from "~/src/framework/world/world";
import { Position, Dimension } from "~/src/framework/game-object/game-object";
import { ImageDimension } from "./image-dimension.interface";
import { Camera } from "../camera/camera";
import { Drawer } from "../camera/drawer";

export abstract class ImageUtils {
    static createImage(url: string, onload: (image: HTMLImageElement) => void) {
        let image = new Image();
        image.src = url;
        image.onload = () => {
            onload(image);
        };
    }
}
