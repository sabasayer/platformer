import { Drawer } from "../camera/drawer";
import { SERVER_URL } from "../helper/index";
import { Level } from "../level/level";
import { createLevel } from "../level/level-factory";
import { ui } from "../ui/ui";
import { GameStateData } from "./game-state-data.interface";
import { LevelData } from "./level-data.interface";

class GameLoader {
    private gameStateFileRoute = "assets/gameState.json";
    private data: GameStateData = { levels: [] };
    private levelData: Record<string, LevelData> = {};

    async load() {
        this.renderLoading();
        const gameState = await this.getGameState();
        this.data = gameState;
        const levels = await this.loadLevels();
        this.finishLoading();

        return {
            levels,
            data: this.data,
        };
    }

    async loadLevel(name: string): Promise<Level> {
        const level = this.data.levels.find((e) => e.name === name);
        if (!level)
            throw new Error("Level is not found ins state data. Name:" + name);

        let levelData = this.levelData[name];

        if (!levelData) {
            levelData = await this.getFile(level.route);
            this.levelData[name] = levelData;
        }

        return createLevel(levelData);
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

    private async getFile(route: string) {
        try {
            const res = await fetch(`${SERVER_URL}${route}`, {
                method: "GET",
            });
            return res.json();
        } catch (error: any) {
            console.error(error);
            Drawer.writeText(
                `There is an error while loading file: ${route} ${error.toString()}`,
                { x: 100, y: 100 },
                "red"
            );
        }
    }
}

export const gameLoader = new GameLoader();
