import { Coin } from "~/src/game-object/coin";
import { Position } from "../../framework/game-object/types/position";

export const createCoin = (position: Position) => new Coin(position);
