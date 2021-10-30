import { AnimationUtils } from "../utils/animation.utils";
import { Drawer } from "../camera/drawer";
import { Position } from "../game-object/types/position";
import { Dimension } from "../game-object/types/dimension";

export class Sprite {
    private imageUrls: string[] = [];
    images: HTMLImageElement[] = [];

    constructor(
        imageUrls?: string[],
        private oneAnimationCycleTime: number = 1
    ) {
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
