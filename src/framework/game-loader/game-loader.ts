import { Drawer } from "../camera/drawer";
import { createGameObject } from "../game-object/game-object-factory";
import { Player } from "../game-object/player/player";
import { SERVER_URL } from "../helper/index";
import { Level } from "../level/level";
import { createLevel } from "../level/level-factory";
import { ui } from "../ui/ui";
import { GameObjectData } from "./game-object-data.interface";
import { GameStateData } from "./game-state-data.interface";
import { LevelData } from "./level-data.interface";
import cloneDeep from "lodash/clonedeep";

class GameLoader {
    private gameStateFileRoute = "assets/gameState.json";
    private data: GameStateData = { levels: [], player: "" };
    private levelData: Record<string, LevelData> = {};
    private playerData: GameObjectData | null = null;

    async load() {
        this.renderLoading();
        const gameState = await this.getGameState();
        this.data = gameState;
        const [player, levels] = await Promise.all([
            this.loadPlayer(),
            this.loadLevels(),
        ]);
        this.finishLoading();

        return {
            levels,
            player,
            data: this.data,
        };
    }

    async loadLevel(name: string): Promise<Level> {
        const level = this.data.levels.find((e) => e.name === name);
        if (!level)
            throw new Error("Level is not found ins state data. Name:" + name);

        let levelData = cloneDeep(this.levelData[name]);

        if (!levelData) {
            levelData = await this.getFile<LevelData>(level.route);
            this.levelData[name] = levelData;
        }

        return createLevel(levelData);
    }

    async loadPlayer(): Promise<Player> {
        const playerRoute = this.data.player;
        if (!playerRoute) throw new Error("Player route is not found");

        let playerData = this.playerData;

        if (!playerData) {
            playerData = await this.getFile<GameObjectData>(playerRoute);
            this.playerData = playerData;
        }

        return createGameObject(playerData) as Player;
    }

    clearLevelCache() {
        this.levelData = {};
    }

    clearPlayerCache() {
        this.playerData = null;
    }

    private renderLoading() {
        ui.render({
            template: "Loading",
        });
    }

    private finishLoading() {
        ui.unmount();
    }

    private getGameState(): Promise<GameStateData> {
        return this.getFile(this.gameStateFileRoute);
    }

    private async loadLevels() {
        const levels = this.data.levels.filter((e) => !e.lazy);
        return Promise.all(levels.map((level) => this.loadLevel(level.name)));
    }

    private async getFile<T = any>(route: string): Promise<T> {
        try {
            const res = await fetch(`${SERVER_URL}${route}`, {
                method: "GET",
            });
            const json = res.json();
            if (!json) throw new Error(`file at '${route}' is empty`);
            return json;
        } catch (error: any) {
            console.error(error);
            throw new Error(
                `There is an error while loading file: ${route} ${error.toString()}`
            );
        }
    }
}

export const gameLoader = new GameLoader();
