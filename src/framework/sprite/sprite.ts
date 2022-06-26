import { assetManager } from "../asset-manager/asset-manager";
import { Drawer } from "../camera/drawer";
import { Dimension } from "../game-object/types/dimension";
import { Position } from "../game-object/types/position";
import { Renderable } from "../renderable/renderable.interface";
import { ImageDimension } from "../utils/image-dimension.interface";

export class Sprite implements Renderable {
    image: HTMLImageElement;

    constructor(
        private url: string,
        private spriteSheetOptions?: ImageDimension
    ) {
        this.image = assetManager.loadImage(url);
    }

    render(
        frame: number,
        targetPosition: Position,
        targetDimension: Dimension
    ) {
        Drawer.drawImage(
            this.image,
            targetPosition,
            targetDimension,
            this.spriteSheetOptions
        );
    }
}
