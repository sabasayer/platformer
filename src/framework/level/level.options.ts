import { GameObject } from "../game-object/game-object";
import { Position } from "../game-object/types/position";
import { EnumLevelEndType } from "./level-end-type.enum";

export interface LevelOptions {
    name: string;
    objects: GameObject[];
    width: number;
    height: number;
    music?: string;
    playerInitialPosition?: Position;
    scoreVisible?: boolean;
    endType?: EnumLevelEndType;
}
