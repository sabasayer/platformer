import { Initializer } from "../initializer/initializer";
import { LevelOptions } from "./level.options";
import { GameObject } from "../game-object/game-object";
import { World } from "../world/world";
import { EnumGameObjectType } from "../game-object/game-object-type.enum";

export class Level {
    protected prevLevel?: string;
    protected nextLevel?: string;
    protected name: string;
    protected initializer: Initializer;

    constructor(options: LevelOptions) {
        this.name = options.name;
        this.initializer = options.initializer;
        this.prevLevel = options.prevLevel;
        this.nextLevel = options.nextLevel;
    }

    getPrevLevel() {
        return this.prevLevel;
    }

    getNextLevel() {
        return this.nextLevel;
    }

    getName() {
        return this.name;
    }

    protected getObject(finder: (obj: GameObject) => boolean) {
        return this.initializer.getObject(finder);
    }

    endCondition(): boolean {
        const player = this.getObject(
            (e) => e.getType() === EnumGameObjectType.Player
        );
        const endGameFlag = this.getObject(
            (e) => e.getType() === EnumGameObjectType.EndGameFlag
        );

        if (!player || !endGameFlag) return false;
        
        return World.collidesWithObject(player, endGameFlag, false);
    }

    start() {
        this.initializer.start();
    }

    render(frame: number) {
        this.initializer.render(frame);
    }

    end() {
        // run end animation
        this.initializer.end();
    }
}
