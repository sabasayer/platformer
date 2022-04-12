import { FRAME_PER_SECOND } from "../constants";
import { Dimension } from "../game-object/types/dimension";
import { ImageDimension } from "./image-dimension.interface";

export abstract class AnimationUtils {
    /**
     *
     * @param itemsLength total sprites length in animation
     * @param frame current frame
     * @param oneAnimationCycleTime how much second will it take to finish this animation
     */
    static findIndexByFrame(
        itemsLength: number,
        frame: number,
        oneAnimationCycleTime: number = 1
    ): number {
        if (!itemsLength) return 0;

        const framePerImage =
            (FRAME_PER_SECOND / itemsLength) * oneAnimationCycleTime;
        return Math.floor(frame / framePerImage) % itemsLength;
    }

    static findItemByFrame<T>(
        items: T[],
        frame: number,
        oneAnimationCycleTime?: number
    ): T | undefined {
        if (!items.length) return;

        const index = this.findIndexByFrame(
            items.length,
            frame,
            oneAnimationCycleTime
        );
        return items[index];
    }

    static findDimensionsInSprite(
        totalCount: number,
        frame: number,
        oneItemDimension: Dimension,
        oneAnimationCycleTime?: number
    ): ImageDimension | undefined {
        if (!totalCount) return;

        const index = this.findIndexByFrame(
            totalCount,
            frame,
            oneAnimationCycleTime
        );

        return {
            ...oneItemDimension,
            x: index * oneItemDimension.width,
            y: 0,
        };
    }
}
