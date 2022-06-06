import { InteractionLogContainer } from "../interaction-log/interaction-log-container";

class GameWorld {
    width: number = 20048;
    height: number = 1546;
    gravity: number = 13;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    interactionLogContainer = new InteractionLogContainer();
    private logsOn = false;
    private idCounter = 0;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("Context is not found");

        this.ctx = ctx;
        window.$gameWorld = this;
    }

    getId() {
        return this.idCounter++;
    }

    get isLogsOn() {
        return this.logsOn;
    }

    setLogsOn() {
        this.logsOn = true;
    }

    render() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const World = new GameWorld();
export { World };
