import { framePerSecond } from "../constants";

export abstract class AnimationUtils {
    static findIndexByFrame(itemsLength: number, frame: number):number {
        if (!itemsLength) return 0;

        const framePerImage = framePerSecond / itemsLength / 2;
        return Math.floor(frame / framePerImage) % itemsLength;
    }

    static findItemByFrame<T>(items: T[], frame: number): T | undefined {
        if (!items.length) return;

        const index = this.findIndexByFrame(items.length, frame);
        return items[index];
    }
}
