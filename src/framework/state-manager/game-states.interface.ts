import { Level } from "../level/level";

export interface GameState {
    level: Level;
    name: string;
    order?: number;
}
