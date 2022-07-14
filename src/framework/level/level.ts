import { LevelOptions } from "./level.options";
import { GameObject } from "../game-object/game-object";
import { EnumGameObjectType } from "../game-object/game-object-type.enum";
import { Scene } from "../scene/scene";
import { assetManager } from "../asset-manager/asset-manager";
import { Position } from "../game-object/types/position";
import { Player } from "../game-object/player/player";

export class Level {
    protected name: string;
    protected audio: HTMLAudioElement | null = null;
    protected gameObjects: GameObject[] = [];
    protected width: number;
    protected height: number;
    protected playerInitialPosition: Position;

    constructor(options: LevelOptions) {
        this.name = options.name;
        this.gameObjects = options.objects;
        this.width = options.width;
        this.height = options.height;
        this.playerInitialPosition = options.playerInitialPosition;
        if (options.music) {
            this.audio = assetManager.loadSound(options.music, 0.5);
        }
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

        if (player) this.initPlayer(player);

        this.audio?.play();
    }

    registerObjects() {
        Scene.setObjects(this.gameObjects);
    }

    initPlayer(player: Player) {
        if (!this.playerInitialPosition)
            throw new Error("player initial position is not set on level");

        player.setPositions(this.playerInitialPosition);
        player.resetVelocisty();
        this.addObject(player);
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
    }
}
