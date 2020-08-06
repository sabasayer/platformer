import { Position, Dimension } from "../game-object/game-object";
import { World } from "../world/world";
import { ImageDimension } from "../utils/image-dimension.interface";

export abstract class Camera {
    private static x: number = 0;
    private static y: number = 0;
    private static width: number = 1366;
    private static height: number = 768;

    static getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }

    static move(position: Position) {
        this.x = position.x;
        this.y = position.y
    }

    static focusTo(position: Position) {
        let calculatedX = Math.ceil(position.x - (this.width / 2));
        let calculatedX2 = calculatedX + this.width;

        if (calculatedX < 0) calculatedX = 0;
        else if (calculatedX2 > World.width) calculatedX = World.width - this.width;

        let calculatedY = Math.ceil(position.y - (this.height / 2));
        let calculatedY2 = calculatedY + this.height;

        if (calculatedY < 0) calculatedY = 0;
        else if (calculatedY2 > World.height) calculatedY = World.height - this.height;

        this.x = calculatedX;
        this.y = calculatedY;
    }

    static calculatePosition(position: Position): Position {
        return {
            x: position.x - this.x,
            y: position.y - this.y
        }
    }
}

(window as any).gameCam = Camera;
