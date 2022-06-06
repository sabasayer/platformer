import { Camera } from "../../camera/camera";
import { LayerZIndexes } from "../../constants";
import { GameObject } from "../game-object";
import { EnumGameObjectType } from "../game-object-type.enum";
import { GameObjectOptions } from "../game-object.options";
import { Position } from "../types/position";
import { BackgroundImage, BackgroundOptions } from "./background.options";
import clonedeep from "lodash/clonedeep";

export class Background extends GameObject {
    images: BackgroundImage[] = [];

    constructor(options: BackgroundOptions) {
        const gameObjectOptions: GameObjectOptions = {
            ...options,
            initialPosition: {
                ...options.initialPosition,
                z: LayerZIndexes.background,
            },
            type: EnumGameObjectType.Background,
            gravityHasEffectOnIt: false,
        };
        super(gameObjectOptions);

        this.images = options.images.map((e) => ({
            distance: e.distance,
            object: new GameObject({
                ...clonedeep(gameObjectOptions),
                imageUrl: e.url,
            }),
        }));

        this.sort();

        Camera.addListener(this);
    }

    render(frame: number): void {
        this.images.forEach((e) => e.object.render(frame));
    }

    onCameraMove(amount: Position) {
        if (!amount.x) return;

        this.images.forEach((image) => {
            this.moveImage(image, amount);
        });
    }

    moveImage(image: BackgroundImage, amount: Position) {
        if (image.distance) {
            image.object.moveX(amount.x / ((image.distance ?? 0) * 10));
        }

        if (image.hasDuplicate) return;

        const imageRight = image.object.getBoundingBox.right;
        const cameraRight = Camera.getRect().right;

        if (imageRight >= cameraRight) return;

        this.createDuplicate(image);
    }

    private createDuplicate(image: BackgroundImage) {
        const clone = clonedeep(image);
        clone.object.setPositions({
            y: image.object.getPosition.y,
            x: image.object.getPosition.x + image.object.getDimension.width,
        });
        image.hasDuplicate = true;

        this.images.push(clone);
        this.sort();
    }

    private sort() {
        this.images.sort((a, b) => (b.distance ?? 0) - (a.distance ?? 0));
    }

    destroy(): void {
        Camera.removeListener(this);
        super.destroy();
    }
}
