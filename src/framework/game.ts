import { ENVS } from "./constants";

declare global {
    interface Window {
        $game: any;
        $gameWorld: any;
        $gameStateManager: any;
    }
}

export const Game = (window.$game = {
    env: ENVS.dev,
});
