import { LevelOptions } from "./level.options";
import { GameObject } from "../game-object/game-object";
import { EnumGameObjectType } from "../game-object/game-object-type.enum";
import { Scene } from "../scene/scene";
import { assetManager } from "../asset-manager/asset-manager";
import { Position } from "../game-object/types/position";
import { Player } from "../game-object/player/player";
import { score } from "~/src/game-object/score";
import { coinScore } from "~/src/game-object/coin-score";
import { EnumLevelEndType } from "./level-end-type.enum";
import { Npc } from "../game-object/npc/npc";
import { EnumNpcType } from "../game-object/npc/npc-type.enum";
import { TimeLogger } from "../logger/time-logger";

export class Level {
    protected name: string;
    protected audio: HTMLAudioElement | null = null;
    protected gameObjects: GameObject[] = [];
    protected width: number;
    protected height: number;
    protected playerInitialPosition?: Position;
    protected scoreVisible: boolean = true;
    protected endType?: EnumLevelEndType;
    protected timeLogger = new TimeLogger();

    constructor(options: LevelOptions) {
        this.name = options.name;
        this.gameObjects = options.objects;
        this.width = options.width;
        this.height = options.height;
        this.playerInitialPosition = options.playerInitialPosition;
        this.scoreVisible = options.scoreVisible ?? true;
        this.endType = options.endType;
        if (options.music) {
            this.audio = assetManager.loadSound(options.music, 0.5);
        }
    }

    get playTime() {
        return this.timeLogger.diff;
    }

    get dimensions() {
        return {
            width: this.width,
            height: this.height,
        };
    }

    getName() {
        return this.name;
    }

    endCondition(): boolean {
        switch (this.endType) {
            case EnumLevelEndType.flag:
                return this.flagEndLevelCondition();
            case EnumLevelEndType.boss:
                return this.bossEndLevelCondition();
            default:
                return false;
        }
    }

    bossEndLevelCondition(): boolean {
        const boss = this.gameObjects.find(
            (e) =>
                e.getType() === EnumGameObjectType.Npc &&
                (e as Npc).getNpcType() === EnumNpcType.Boss
        );

        return (boss?.getHealth ?? 0) <= 0;
    }

    flagEndLevelCondition(): boolean {
        const player = this.gameObjects.find(
            (e) => e.getType() === EnumGameObjectType.Player
        );
        const endGameFlag = this.gameObjects.find(
            (e) => e.getType() === EnumGameObjectType.EndGameFlag
        );

        if (!player || !endGameFlag) return false;

        return Scene.collisionGroup.collidesWithObject(
            player,
            endGameFlag,
            false
        );
    }

    start(player?: Player) {
        this.registerObjects();

        if (this.scoreVisible) this.initScoreBoard();
        if (player) this.initPlayer(player);

        this.audio?.play();
        this.timeLogger.reset();
        this.timeLogger.start();
    }

    registerObjects() {
        Scene.setObjects(this.gameObjects);
    }

    initScoreBoard() {
        this.addObject(score);
        this.addObject(coinScore);
    }

    initPlayer(player: Player) {
        if (!this.playerInitialPosition)
            throw new Error("player initial position is not set on level");

        player.setPositions(this.playerInitialPosition);
        player.resetVelocisty();
        this.addObject(player);
        player.initKeyboardEvents();
    }

    addObject(gameObject: GameObject) {
        Scene.addObject(gameObject);
        this.gameObjects.push(gameObject);
    }

    getObject(finder: (obj: GameObject) => boolean): GameObject | null {
        return this.gameObjects.find(finder) ?? null;
    }

    removeObject(object: GameObject) {
        Scene.removeObject(object);
        const index = this.gameObjects.findIndex((e) => e.id === object.id);
        if (index > -1) this.gameObjects.splice(index, 1);
    }

    protected resetObjectsState() {
        this.gameObjects.forEach((object) => {
            object.resetPosition();
        });
    }

    end() {
        // run end animation
        this.audio?.pause();
        Scene.clear();
        this.timeLogger.end();
    }
}
