import { FRAME_PER_SECOND } from "../constants";
import { Dimension } from "../game-object/types/dimension";
import { ImageDimension } from "./image-dimension.interface";

export abstract class AnimationUtils {
    /**
     *
     * @param itemsLength total sprites length in animation
     * @param frame current frame
     * @param animationDuration how much second will it take to finish this animation
     */
    static findIndexByFrame(
        itemsLength: number,
        frame: number,
        animationDuration: number = 1
    ): number {
        if (!itemsLength) return 0;

        const framePerImage =
            (FRAME_PER_SECOND / itemsLength) * animationDuration;
        return Math.floor(frame / framePerImage) % itemsLength;
    }

    static findItemByFrame<T>(
        items: T[],
        frame: number,
        animationDuration?: number
    ): T | undefined {
        if (!items.length) return;

        const index = this.findIndexByFrame(
            items.length,
            frame,
            animationDuration
        );

        return items[index];
    }

    static findDimensionsInSprite(
        totalCount: number,
        frame: number,
        oneItemDimension: Dimension,
        animationDuration?: number
    ): ImageDimension | undefined {
        if (!totalCount) return;

        const index = this.findIndexByFrame(
            totalCount,
            frame,
            animationDuration
        );

        return {
            ...oneItemDimension,
            x: index * oneItemDimension.width,
            y: 0,
        };
    }
}
