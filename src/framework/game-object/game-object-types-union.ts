import { BackgroundOptions } from "./background/background.options";
import { GameObjectOptions } from "./game-object.options";
import { ItemObjectOptions } from "./item/item.options";
import { NpcOptions } from "./npc/npc.options";
import { PlayerOptions } from "./player/player.options";

export type GameObjectTypesUnion = GameObjectOptions &
    PlayerOptions &
    NpcOptions &
    ItemObjectOptions &
    BackgroundOptions;
