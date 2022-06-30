import { Level } from "../framework/level/level";
import { createCoin } from "./objects/coin.object";

export const levelTest = new Level({
    name: "levelTest",
    // music: "musics/bg-music.mp3"),
    width: 100,
    height: 400,
    objects: [createCoin({ x: 100, y: 100 })],
});
