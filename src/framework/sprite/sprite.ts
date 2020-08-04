import { AnimationUtils } from "../utils/animation.utils";
import { ImageUtils } from "../utils/image.utils";
import { Dimension, Position } from "../game-object/game-object";

export class Sprite {
    private imageUrls: string[] = [];
    images: HTMLImageElement[] = [];

    constructor(imageUrls?: string[]) {
        imageUrls && this.setImageUrls(imageUrls);
    }

    setImageUrls(imageUrls: string[]) {
        this.imageUrls = imageUrls;
        this.imageUrls.forEach((e) => {
            this.addImage(e);
        });
    }

    addImage(url: string) {
        let image = new Image();
        image.src = url;
        image.onload = () => {
            this.images.push(image);
        };
    }

    findImage(frame: number) {
        return AnimationUtils.findItemByFrame(this.images, frame);
    }

    render(
        frame: number,
        targetPosition: Position,
        targetDimension: Dimension
    ) {
        const image = this.findImage(frame);
        if (!image) return false;

        ImageUtils.renderImage(image, targetPosition, targetDimension);

        return true;
    }
}
