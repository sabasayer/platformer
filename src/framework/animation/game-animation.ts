import { AnimationUtils } from "../utils/animation.utils";
import { Position } from "../game-object/types/position";
import { Dimension } from "../game-object/types/dimension";
import { Renderable } from "../renderable/renderable.interface";
import { Sprite } from "../sprite/sprite";

export class GameAnimation implements Renderable {
    constructor(
        private frames: Sprite[],
        private oneAnimationCycleTime: number = 1
    ) {}

    findFrame(frame: number) {
        return AnimationUtils.findItemByFrame(
            this.frames,
            frame,
            this.oneAnimationCycleTime
        );
    }

    render(
        frame: number,
        targetPosition: Position,
        targetDimension: Dimension
    ) {
        const animationFrame = this.findFrame(frame);

        if (!animationFrame) return false;

        animationFrame.render(frame, targetPosition, targetDimension);

        return true;
    }
}
