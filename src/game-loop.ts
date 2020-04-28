import { Player } from "./player/player";
import { GameObject } from "./game-object/game-object";
import { World } from "./world/world";
import { frameDelay } from "./constants";
import somePhoto from '../assets/sprites/GinoCharacter/PNG/idle_run_jump/idle01.png';

let player = new Player({ x: 30, y: 30 }, { width: 50, height: 50 },somePhoto,true);
let object = new GameObject({ x: 42, y: 250 }, { width: 250, height: 12 },null, true);
object.gravityHasEffectOnIt = false;
let object2 = new GameObject({ x: 392, y: 382 }, { width: 211, height: 11 },null, true);
object2.gravityHasEffectOnIt = false;

let loop = () => {
  World.render();
  player.render();
  object.render();
  object2.render();

  setTimeout(() => {
    requestAnimationFrame(loop);
  }, frameDelay);
};

requestAnimationFrame(loop);
