import { Player } from "./player/player";
import { GameObject, EnumObjectState } from "./game-object/game-object";
import { World } from "./world/world";
import { frameDelay } from "./constants";
import idle1 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle01.png";
import idle2 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle02.png";
import idle3 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle03.png";
import idle4 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle04.png";
import idle5 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle05.png";
import idle6 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle06.png";
import idle7 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle07.png";
import idle8 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle08.png";
import idle9 from "../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle09.png";
import { Sprite } from "./sprite/sprite";

let playerIdleSprite = new Sprite([
    idle1,
    idle2,
    idle3,
    idle4,
    idle5,
    idle6,
    idle7,
    idle8,
    idle9,
]);

let player = new Player({
    initialPosition: { x: 30, y: 30 },
    dimension: { width: 64, height: 64 },
    canMoveAtAir: true,
    spriteStore: { [EnumObjectState.idle]: playerIdleSprite },
    imageUrl: idle1,
    isCollidable: true,
});
let object = new GameObject({
    initialPosition: { x: 42, y: 250 },
    dimension: { width: 250, height: 12 },
    isCollidable: true,
});
object.gravityHasEffectOnIt = false;
let object2 = new GameObject({
    initialPosition: { x: 392, y: 382 },
    dimension: { width: 211, height: 11 },
    isCollidable: true,
});
object2.gravityHasEffectOnIt = false;

let frame = 0;
let loop = () => {
    World.render();
    player.render(frame);
    object.render(frame);
    object2.render(frame);
    frame++;
    if (frame > 60) frame = 0;

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, frameDelay);
};

requestAnimationFrame(loop);
