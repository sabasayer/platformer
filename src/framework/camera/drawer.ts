import { World } from "../world/world";
import { Camera } from "./camera";
import { ImageDimension } from "../utils/image-dimension.interface";
import { Position } from "../game-object/types/position";
import { Dimension } from "../game-object/types/dimension";

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
                imageDimension?.x,
                imageDimension?.y,
                imageDimension?.width,
                imageDimension?.height,
                position.x,
                position.y,
                dimension.width,
                dimension.height
            );
    }
}
