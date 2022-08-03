export const FRAME_PER_SECOND: number = 60;
export const FRAME_RATE: number = 1 / FRAME_PER_SECOND;
export const FRAME_DELAY: number = FRAME_RATE;

export const MOVEMENT_MULTIPLIER: number = 6;

export const ENVS = {
    dev: "dev",
    preview: "preview",
};

export const LayerZIndexes = {
    background: -1,
    level: 0,
    ui: 1,
    menu: 2,
};

export const TextConstants = {
    size: 13,
    family: "Arial",
    color: "black",
};

export const MENU_STATE = "menu";
export const END_GAME_STATE = "end_game";

export const STATIC_LEVELS = [MENU_STATE, END_GAME_STATE];
