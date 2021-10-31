import { Position } from "../../framework/game-object/types/position";
import { Patrol } from "~/src/game-object/patrol";

export const createPatrol = (position: Position) => new Patrol(position);
