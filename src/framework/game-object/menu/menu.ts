import { Level } from "../../level/level";
import { EnumEvent } from "./event.enum";
import { MenuEvent, MenuOptions } from "./menu.options";
import { collisionHelper } from "../../helper/collision.helper";
import { BoundingBox } from "../types/bounding-box";
import { Camera } from "../../camera/camera";
import { Scene } from "../../scene/scene";

export class Menu extends Level {
    private events: MenuEvent[];

    constructor(options: MenuOptions) {
        super({ ...options, scoreVisible: false });
        this.events = options.events;
    }

    start(): void {
        super.start();
        Camera.move({ x: 0, y: 0 });
        this.listenEvents();
    }

    private get mouseEvents() {
        return this.events.filter((e) => e.eventName === EnumEvent.click);
    }

    private clickListener = (e: MouseEvent) => {
        const boundingBox: BoundingBox = {
            left: e.offsetX,
            right: e.offsetX,
            bottom: e.offsetY,
            top: e.offsetY,
        };

        this.mouseEvents.forEach((event) => {
            const element = Scene.getObject(
                (obj) => obj.getName === event.elementName
            );
            if (!element) return;

            const hasCollision = collisionHelper.checkForBoundingBoxes(
                element.getBoundingBox,
                boundingBox
            );

            if (hasCollision) {
                event.listener(this);
            }
        });
    };

    listenEvents() {
        const hasClick = this.mouseEvents.length;
        if (hasClick) {
            window.addEventListener("click", this.clickListener);
        }
    }

    end(): void {
        super.end();
        window.removeEventListener("click", this.clickListener);
    }
}
