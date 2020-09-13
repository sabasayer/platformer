import { World } from "../world/world";
import { Camera } from "./camera";
import { Position, Dimension } from "../game-object/game-object";
import { ImageDimension } from "../utils/image-dimension.interface";

export abstract class Drawer {
    static writeText(
        text: string,
        absolutePosition: Position,
        color: string,
        size: string = "13px",
        fontFamiliy: string = "Arial"
    ) {
        const position = Camera.calculatePosition(absolutePosition);

        World.ctx.fillStyle = color;
        World.ctx.font = `${size} ${fontFamiliy}`;
        World.ctx.fillText(text, position.x, position.y - 15);
    }

    static fillRect(
        absolutePosition: Position,
        dimension: Dimension,
        color: string
    ) {
        const position = Camera.calculatePosition(absolutePosition);

        World.ctx.fillStyle = color;

        World.ctx.fillRect(
            position.x,
            position.y,
            dimension.width,
            dimension.height
        );
    }

    static strokeRect(
        absolutePosition: Position,
        dimension: Dimension,
        color: string
    ) {
        const position = Camera.calculatePosition(absolutePosition);

        World.ctx.fillStyle = color;
        World.ctx.strokeRect(
            position.x,
            position.y,
            dimension.width,
            dimension.height
        );
    }

    static drawImage(
        image: HTMLImageElement,
        absolutePosition: Position,
        dimension: Dimension,
        imageDimension?: ImageDimension
    ) {
        const position = Camera.calculatePosition(absolutePosition);

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
