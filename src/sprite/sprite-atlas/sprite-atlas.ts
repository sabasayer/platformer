import { SpriteAtlasMap } from "./sprite-atlas-map.interface";
import { ImageUtils } from "../../utils/image.utils";
import { Position, Dimension } from "~/src/game-object/game-object";
import { framePerSecond } from "~/src/constants";
import { AnimationUtils } from "~/src/utils/animation.utils";

export class SpriteAtlas {
    image: HTMLImageElement;
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

        ImageUtils.renderImage(
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
        if (!dimensions) return;

        ImageUtils.renderImage(
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
