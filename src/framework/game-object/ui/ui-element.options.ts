import { GameObjectOptions } from "../game-object.options";

export interface UIElementTextOptions {
    content: string | (() => string);
    color?: string;
    fontSize?: number;
    family?: string;
}

export interface UIElementOptions
    extends Pick<
        GameObjectOptions,
        "initialPosition" | "dimension" | "imageUrl" | "name" | "color"
    > {
    text?: UIElementTextOptions;
}
