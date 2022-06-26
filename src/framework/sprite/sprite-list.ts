import { AnimationUtils } from "../utils/animation.utils";
import { Drawer } from "../camera/drawer";
import { Position } from "../game-object/types/position";
import { Dimension } from "../game-object/types/dimension";
import { assetManager } from "../asset-manager/asset-manager";
import { Renderable } from "../renderable/renderable.interface";

export class SpriteList implements Renderable {
    images: HTMLImageElement[] = [];

    constructor(
        private urls: string[],
        private oneAnimationCycleTime: number = 1
    ) {
        this.loadImages(urls);
    }

    loadImages(imageUrls: string[]) {
        imageUrls.forEach((e) => {
            this.images.push(assetManager.loadImage(e));
        });
    }

    findImage(frame: number) {
        return AnimationUtils.findItemByFrame(
            this.images,
            frame,
            this.oneAnimationCycleTime
        );
    }

    render(
        frame: number,
        targetPosition: Position,
        targetDimension: Dimension
    ) {
        const image = this.findImage(frame);
        if (!image) return false;

        Drawer.drawImage(image, targetPosition, targetDimension);

        return true;
    }
}
