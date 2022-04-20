import { Drawer } from "../../camera/drawer";
import { TextConstants } from "../../constants";
import { GameObject } from "../game-object";
import { EnumGameObjectType } from "../game-object-type.enum";
import { UIElementOptions, UIElementTextOptions } from "./ui-element.options";

export class UIElement extends GameObject {
    private text?: UIElementTextOptions;
    constructor(options: UIElementOptions) {
        super({
            ...options,
            type: EnumGameObjectType.IdleObject,
            gravityHasEffectOnIt: false,
        });

        this.text = options.text;
    }

    protected renderBody(frame: number): void {
        super.renderBody(frame);
        this.renderText();
    }

    protected renderText() {
        if (!this.text) return;

        const size = this.text.fontSize ?? TextConstants.size;
        const text =
            typeof this.text.content === "string"
                ? this.text.content
                : this.text.content();

        Drawer.writeText(
            text,
            {
                ...this.position,
                x: this.position.x + 10,
                y: this.position.y + this.dimension.height / 2,
            },
            this.text.color,
            size,
            this.text.family,
            this.dimension.width
        );
    }
}
