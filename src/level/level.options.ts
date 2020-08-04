import { Initializer } from "../initializer/initializer";

export interface LevelOptions {
    name: string,
    initializer: Initializer,
    nextLevel?: string,
    prevLevel?: string
}