import { Camera } from "../../camera/camera";
import { LayerZIndexes } from "../../constants";
import { GameObject } from "../game-object";
import { EnumGameObjectType } from "../game-object-type.enum";
import { GameObjectOptions } from "../game-object.options";
import { Position } from "../types/position";
import { BackgroundImage, BackgroundOptions } from "./background.options";

export class Background extends GameObject {
    images: BackgroundImage[] = [];

    constructor(options: BackgroundOptions) {
        const gameObjectOptions: GameObjectOptions = {
            ...options,
            initialPosition: {
                ...options.initialPosition,
                z: LayerZIndexes.background,
            },
            type: EnumGameObjectType.IdleObject,
            gravityHasEffectOnIt: false,
        };
        super(gameObjectOptions);

        this.images = options.images.map((e) => ({
            parrallaxSpeed: e.parrallaxSpeed,
            object: new GameObject({
                ...gameObjectOptions,
                imageUrl: e.url,
            }),
        }));

        Camera.addListener(this);
    }

    render(frame: number): void {
        this.images.forEach((e) => e.object.render(frame));
    }

    onCameraMove(amount: Position) {
        if (!amount.x) return;

        const parrallaxImages = this.images.filter((e) => e.parrallaxSpeed);
        parrallaxImages.forEach((image) =>
            image.object.moveX(amount.x * (image.parrallaxSpeed ?? 0))
        );
    }

    destroy(): void {
        Camera.removeListener(this);
        super.destroy();
    }
}
