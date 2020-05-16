import { World } from "~/src/world/world";
import { Position, Dimension } from "~/src/game-object/game-object";
import { ImageDimension } from "./image-dimension.interface";

export abstract class ImageUtils {
    static createImage(url: string, onload: (image: HTMLImageElement) => void) {
        let image = new Image();
        image.src = url;
        image.onload = () => {
            onload(image);
        };
    }

    static renderImage(
        image: HTMLImageElement,
        position: Position,
        dimension: Dimension,
        imageDimension?: ImageDimension
    ) {
        if (!imageDimension)
            World.ctx.drawImage(
                image,
                position.x,
                position.y,
                dimension.width,
                dimension.height
            );
        else
            World.ctx.drawImage(
                image,
                position.x,
                position.y,
                dimension.width,
                dimension.height,
                imageDimension?.x,
                imageDimension?.y,
                imageDimension?.width,
                imageDimension?.height
            );
    }
}
