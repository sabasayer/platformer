import { GameObject } from "../../game-object/game-object";
import { EnumInteractionType } from "./interaction-type.enum";

export interface InteractionLog {
    type: EnumInteractionType;
    source: GameObject;
    target: GameObject;
    data?: unknown;
}
