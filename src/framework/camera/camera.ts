import { World } from "../world/world";
import { Position } from "../game-object/types/position";
import { collisionHelper } from "../helper/collision.helper";

export interface CameraListener {
    onCameraMove: (moveAmount: Position) => void;
}

export abstract class Camera {
    private static x: number = 0;
    private static y: number = 0;
    private static width: number = window.innerWidth;
    private static height: number = window.innerHeight;
    private static listeners: CameraListener[] = [];

    static getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            right: this.x + this.width,
        };
    }

    static move(position: Position) {
        this.x = position.x;
        this.y = position.y;
    }

    static focusTo(position: Position) {
        let calculatedX = Math.ceil(position.x - this.width / 2);
        let calculatedX2 = calculatedX + this.width;

        const worldDimensions = collisionHelper.getWordlDimensions();

        if (calculatedX < 0) calculatedX = 0;
        else if (calculatedX2 > worldDimensions.width)
            calculatedX = worldDimensions.width - this.width;

        let calculatedY = Math.ceil(position.y - this.height / 2);
        let calculatedY2 = calculatedY + this.height;

        if (calculatedY < 0) calculatedY = 0;
        else if (calculatedY2 > worldDimensions.height)
            calculatedY = worldDimensions.height - this.height;

        const oldX = this.x;
        const oldY = this.y;

        this.x = calculatedX;
        this.y = calculatedY;

        const changeX = oldX - this.x;
        const changeY = oldY - this.y;

        if (!changeX && !changeY) return;

        this.listeners.forEach((listener) =>
            listener.onCameraMove({ x: changeX, y: changeY })
        );
    }

    static calculatePosition(position: Position): Position {
        if (position.fixed) return position;
        return {
            x: position.x - this.x,
            y: position.y - this.y,
        };
    }

    static addListener(callback: CameraListener) {
        this.listeners.push(callback);
    }

    static removeListener(callback: CameraListener) {
        const index = this.listeners.findIndex((e) => e === callback);
        if (~index) return;

        this.listeners.splice(index, 1);
    }
}

(window as any).gameCam = Camera;
