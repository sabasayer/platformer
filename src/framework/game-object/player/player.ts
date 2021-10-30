import { GameObject } from "../game-object";
import { KeyboardHelper, EnumKeyboardKey } from "../../input/keyboard.input";
import { PlayerOptions } from "./player.options";
import { EnumGameObjectType } from "../game-object-type.enum";
import { Npc } from "../npc/npc";
import { Camera } from "../../camera/camera";
import { Inventory } from "./inventory";
import { ItemObject } from "../item/item";

export class Player extends GameObject {
    protected velocityX: number = 0;
    private speed: number = 15;
    private jumpForce: number = 80;
    private canMoveAtAir: boolean = false;
    private inventory = new Inventory();

    constructor(options: PlayerOptions) {
        super(options);
        this.canMoveAtAir = options.canMoveAtAir;
        this.handleKeyboardEvents();
    }

    handleKeyboardEvents() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    keydown = (ev: KeyboardEvent) => {
        KeyboardHelper.keyDown(ev);
        this.checkKeyboardInputs();
    };

    keyup = (ev: KeyboardEvent) => {
        KeyboardHelper.keyUp(ev);
        this.checkKeyboardInputs();
    };

    render(frame: number) {
        super.render(frame);
    }

    checkKeyboardInputs() {
        if (KeyboardHelper.keys[EnumKeyboardKey.SPACE]) this.jump();

        if (KeyboardHelper.keys[EnumKeyboardKey.RIGHT]) this.moveRight();
        else if (KeyboardHelper.keys[EnumKeyboardKey.LEFT]) this.moveLeft();
        else {
            //stops if left or right not pressing and if not is in the air
            if (this.canMoveAtAir || this.velocityY == 0) {
                this.velocityX = 0;
            }
        }
    }

    onCollisionX(amount: number, collidedObjects: GameObject[]) {
        super.onCollisionX(amount, collidedObjects);
        if (!collidedObjects.length) return;

        const isEnemy = this.handleEnemyCollision(collidedObjects);
        if (isEnemy) return this.moveX(-5 * amount);

        this.handleItemCollision(collidedObjects);
    }

    onCollisionY(amount: number, collidedObjects: GameObject[]) {
        super.onCollisionY(amount, collidedObjects);
        if (!collidedObjects.length) return;

        const isEnemy = this.handleEnemyCollision(collidedObjects);
        if (isEnemy) return this.moveY(-5 * amount);

        this.handleItemCollision(collidedObjects);
    }

    afterMoveX() {
        Camera.focusTo(this.position);
    }

    afterMoveY() {
        Camera.focusTo(this.position);
    }

    handleEnemyCollision(collidedObjects: GameObject[]) {
        const enemies = collidedObjects.filter(
            (e) => e.getType() === EnumGameObjectType.Npc
        );

        enemies.forEach((enemy) => {
            this.takeDamage((enemy as any as Npc).getDamage());
        });

        if (enemies.length) {
            return true;
        }
    }

    handleItemCollision(collidedObjects: GameObject[]) {
        const items = collidedObjects.filter(
            (e) => e.getType() === EnumGameObjectType.Item
        );

        items.forEach((e) => {
            if (e.getType() === EnumGameObjectType.Item) {
                this.inventory.addItem(e as ItemObject);
                e.die();
            }
        });
    }

    jump() {
        if (this.velocityY == 0) {
            this.velocityY = -this.jumpForce;
        }
    }

    moveRight() {
        //disables airmove
        if (this.canMoveAtAir || this.velocityY == 0)
            this.velocityX = this.speed;
    }

    moveLeft() {
        //disables airmove
        if (this.canMoveAtAir || this.velocityY == 0)
            this.velocityX = -this.speed;
    }

    die() {
        alert("you died");
        this.destroy();
    }

    destroy() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);
        super.destroy();
    }
}
