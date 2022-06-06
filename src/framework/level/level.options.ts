import { GameObject } from "../game-object/game-object";

export interface LevelOptions {
    name: string;
    objects: GameObject[];
    width: number;
    height: number;
    music?: string;
}
