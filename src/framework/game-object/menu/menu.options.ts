import { LevelOptions } from "../../level/level.options";
import { EnumEvent } from "./event.enum";
import { Menu } from "./menu";

export interface MenuEvent {
    eventName: EnumEvent;
    elementName: string;
    listener: (menu: Menu) => void;
}

export interface MenuOptions
    extends Omit<LevelOptions, "nextLevel" | "prevLevel"> {
    events: MenuEvent[];
}
