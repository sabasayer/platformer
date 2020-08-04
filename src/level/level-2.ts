import { Level } from "./level";
import { level2Initializer } from "../initializer/level-2.initializer";

export const level2 = new Level({
    name: 'level2',
    initializer: level2Initializer,
    prevLevel: 'level1',
})