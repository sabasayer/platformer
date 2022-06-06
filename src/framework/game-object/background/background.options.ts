import { GameObject } from "../game-object";
import { GameObjectOptions } from "../game-object.options";

export interface BackgroundImage {
    object: GameObject;
    hasDuplicate?: boolean;
    distance?: number;
}

export interface BackgroundOptions
    extends Pick<GameObjectOptions, "initialPosition" | "dimension"> {
    images: {
        url: string;
        distance?: number;
    }[];
}
