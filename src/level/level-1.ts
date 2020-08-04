import { Level } from "../framework/level/level";
import { level1Initializer } from "../initializer/level-1.initializer";

export const level1 = new Level({
    name: 'level1',
    initializer: level1Initializer,
    nextLevel: 'level2',
})