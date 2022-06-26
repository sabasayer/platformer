import { Dimension } from "../game-object/types/dimension";
import { Position } from "../game-object/types/position";

export interface Renderable {
    render: (frame: number, position: Position, dimension: Dimension) => void;
}
