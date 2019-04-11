import { World } from "./world";
import { Player } from "./player";
import { frameDelay } from "./constants";
import { Object } from "./object";

let player = new Player({ x: 30, y: 30 }, { width: 50, height: 50 });
let object = new Object({ x: 42, y: 250 }, { width: 250, height: 12 }, true);
object.gravityHasEffectOnIt = false;
let object2 = new Object({ x: 392, y: 382 }, { width: 211, height: 11 }, true);
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
