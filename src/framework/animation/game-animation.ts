import { AnimationUtils } from "../utils/animation.utils";
import { Drawer } from "../camera/drawer";
import { Position } from "../game-object/types/position";
import { Dimension } from "../game-object/types/dimension";
import { assetManager } from "../asset-manager/asset-manager";
import { Renderable } from "../renderable/renderable.interface";

export class GameAnimation implements Renderable {
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
        this.image = assetManager.loadImage(imageUrl);
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

        Drawer.drawPartialImage(
            this.image,
            targetPosition,
            targetDimension,
            dimensions
        );

        return true;
    }
}
