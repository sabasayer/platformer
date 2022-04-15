import { SpriteAtlasMap } from "./sprite-atlas-map.interface";
import { ImageUtils } from "../../utils/image.utils";
import { AnimationUtils } from "~/src/framework/utils/animation.utils";
import { Drawer } from "../../camera/drawer";
import { Position } from "../../game-object/types/position";
import { Dimension } from "../../game-object/types/dimension";

export class SpriteAtlas {
    image: HTMLImageElement | null = null;
    map: SpriteAtlasMap;

    constructor(imageUrl: string, map: SpriteAtlasMap) {
        this.map = map;
        this.createImage(imageUrl);
    }

    createImage(url: string) {
        ImageUtils.createImage(url, (image) => (this.image = image));
    }

    renderImage(
        name: string,
        targetPosition: Position,
        targetDimension: Dimension
    ) {
        let imageDimensions = this.map[name];
        if (!imageDimensions?.[0]) return;

        Drawer.drawImage(
            this.image,
            targetPosition,
            targetDimension,
            imageDimensions[0]
        );
    }

    renderAnimation(
        name: string,
        targetPosition: Position,
        targetDimension: Dimension,
        frame: number
    ) {
        const dimensions = this.findImageDimension(name, frame);
        if (!this.image || !dimensions) return;

        Drawer.drawImage(
            this.image,
            targetPosition,
            targetDimension,
            dimensions
        );
    }

    findImageDimension(name: string, frame: number) {
        const imageDimensions = this.map[name];
        if (!imageDimensions) return;

        return AnimationUtils.findItemByFrame(imageDimensions, frame);
    }
}
