import { AnimationUtils } from "../utils/animation.utils";
import { Drawer } from "../camera/drawer";
import { Position } from "../game-object/types/position";
import { Dimension } from "../game-object/types/dimension";
import { ImageDimension } from "../utils/image-dimension.interface";

export class SpriteGroup {
    image: HTMLImageElement | null = null;

    constructor(
        private imageUrl: string,
        private oneItemDimension: Dimension,
        private totalCount: number,
        private oneAnimationCycleTime: number = 1
    ) {
        this.setImageUrl(imageUrl);
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
        this.addImage(imageUrl);
    }

    addImage(url: string) {
        let image = new Image();
        image.src = url;
        image.onload = () => {
            this.image = image;
        };
    }

    findDimensions(frame: number) {
        return AnimationUtils.findDimensionsInSprite(
            this.totalCount,
            frame,
            this.oneItemDimension,
            this.oneAnimationCycleTime
        );
    }

    render(
        frame: number,
        targetPosition: Position,
        targetDimension: Dimension
    ) {
        const dimensions = this.findDimensions(frame);
        if (!this.image || !dimensions) return false;

        Drawer.drawImage(
            this.image,
            targetPosition,
            targetDimension,
            dimensions
        );

        return true;
    }
}
